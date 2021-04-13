import BigNumber from "bignumber.js";
import {
  claimRegulator,
  depositRegulator,
  getPointsAddress,
  getRegulatorContract,
  withdrawRegulator,
  totalStakedRegulator,
  getDeFiatAddress,
  multiplierRegulator,
  stakedRegulator,
  pendingRegulator,
  getRegulatorApr,
  getVaultContract,
  buybackRegulator,
  isAbovePeg,
  pendingTotalRegulator,
  getVaultPrice,
  getCircleAddress,
  getCircleLpAddress,
  getPointsLpAddress,
  getDeFiatLpAddress,
  getVaultV2Contract,
  getVaultV2Address,
} from "defiat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { getBalance } from "utils";
import { provider } from "web3-core";
import { useBlock } from "./useBlock";
import { useDeFiat } from "./useDeFiat";

interface RegulatorData {
  totalLocked: BigNumber;
  totalValueLocked: BigNumber;
  pointsPrice: BigNumber;
  tokenPrice: BigNumber;
  peg: number;
  ratio: BigNumber;
  pendingRewards: BigNumber;
  tokenBalance: BigNumber;
  stakedBalance: BigNumber;
  apr: string;
  buybackBalance: BigNumber;
  isAbovePeg: boolean;
}

export const useRegulator = () => {
  const [data, setData] = useState<RegulatorData>();

  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();

  const Regulator = useMemo(() => getRegulatorContract(DeFiat), [DeFiat]);
  const VaultV2 = useMemo(() => getVaultV2Contract(DeFiat), [DeFiat]);

  const handleClaim = useCallback(async () => {
    const txHash = await claimRegulator(Regulator, account);
    return txHash;
  }, [account, Regulator]);

  const handleDeposit = useCallback(
    async (deposit: string) => {
      const txHash = await depositRegulator(Regulator, account, deposit);
      return txHash;
    },
    [account, Regulator]
  );

  const handleWithdraw = useCallback(
    async (withdraw: string) => {
      const txHash = await withdrawRegulator(Regulator, account, withdraw);
      return txHash;
    },
    [account, Regulator]
  );

  const getData = useCallback(async () => {
    const values = await Promise.all([
      getBalance(getPointsAddress(DeFiat), account, ethereum),
      totalStakedRegulator(Regulator),
      multiplierRegulator(Regulator),
      stakedRegulator(Regulator, account),
      getRegulatorApr(DeFiat, VaultV2, Regulator),
      buybackRegulator(Regulator),
      isAbovePeg(Regulator),
      pendingRegulator(Regulator, account),
      pendingTotalRegulator(Regulator),
      getVaultPrice(
        VaultV2,
        getPointsAddress(DeFiat),
        getPointsLpAddress(DeFiat)
      ),
      getVaultPrice(
        VaultV2,
        getDeFiatAddress(DeFiat),
        getDeFiatLpAddress(DeFiat)
      ),
      getVaultPrice(
        VaultV2,
        getCircleAddress(DeFiat),
        getCircleLpAddress(DeFiat)
      ),
      getBalance(getDeFiatAddress(DeFiat), getVaultV2Address(DeFiat), ethereum),
      VaultV2.methods.pendingRewards().call(),
      VaultV2.methods.bondedRewards().call(),
      VaultV2.methods.lastDistributionBlock().call(),
      VaultV2.methods.bondedRewardsPerBlock().call(),
      VaultV2.methods.distributionRate().call(),
      Regulator.methods.buybackRate().call(),
    ]);

    const tokenBalance = values[0];
    const totalLocked = values[1];
    const peg = +values[2] / 1000;
    const stakedBalance = values[3];
    const apr = values[4].div(1e18).decimalPlaces(2).toString();
    const buybackBalance = values[5];
    const abovePeg = values[6];
    const pending = new BigNumber(values[7]);
    const pendingTotal = values[8];
    const pointsPrice = values[9].times(1e18).div(values[11]);
    const tokenPrice = values[10].times(1e18).div(values[11]);

    const vaultBalance = new BigNumber(values[12]);
    const pendingRewardsVault = new BigNumber(values[13]);
    const bondedRewards = new BigNumber(values[14]);
    const lastDistributionBlock = new BigNumber(values[15]);
    const bondedRewardsPerBlock = new BigNumber(values[16]);
    const distributionRate = new BigNumber(1000).minus(values[17]).div(1000);
    const buybackRate = new BigNumber(1000).minus(values[18]).div(1000);

    // find the rewards that are waiting on the vault to be distributed
    const bondedAmount = bondedRewards.eq(0)
      ? 0
      : new BigNumber(block)
          .minus(lastDistributionBlock)
          .times(bondedRewardsPerBlock);
    const feeRewards = vaultBalance
      .minus(bondedRewards)
      .minus(pendingRewardsVault);
    const vaultPending = feeRewards.plus(bondedAmount);
    const totalVaultPending = vaultPending.times(distributionRate);
    const poolVaultRewards = totalVaultPending.times(buybackRate);
    const poolRewards = pendingTotal
      .plus(poolVaultRewards)
      .times(stakedBalance)
      .div(totalLocked);
    const pendingRewards = pending.plus(poolRewards);

    const totalValueLocked = pointsPrice.times(totalLocked).div(1e18);
    const ratio = tokenPrice.div(pointsPrice);

    setData({
      totalLocked,
      totalValueLocked,
      pointsPrice,
      tokenPrice,
      tokenBalance,
      peg,
      ratio,
      pendingRewards: pendingRewards,
      stakedBalance,
      apr: apr,
      buybackBalance,
      isAbovePeg: abovePeg,
    });
  }, [account, ethereum, DeFiat, VaultV2, Regulator, block]);

  useEffect(() => {
    if (!!account && !!DeFiat) {
      getData();
    }
  }, [account, block, DeFiat, getData]);

  return {
    data,
    claim: handleClaim,
    deposit: handleDeposit,
    withdraw: handleWithdraw,
  };
};
