import BigNumber from "bignumber.js";
import {
  claimRegulator,
  depositRegulator,
  getOracle,
  getPointsAddress,
  getRegulatorContract,
  getTokenPrice,
  withdrawRegulator,
  totalStakedRegulator,
  getDeFiatAddress,
  multiplierRegulator,
  stakedRegulator,
  pendingRegulator,
  getTetherAddress,
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
} from "defiat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { getBalance, getDisplayBalance } from "utils";
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
  const Oracle = useMemo(() => getOracle(DeFiat), [DeFiat]);
  const Vault = useMemo(() => getVaultContract(DeFiat), [DeFiat]);

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
      getRegulatorApr(DeFiat, Vault, Regulator),
      buybackRegulator(Regulator),
      isAbovePeg(Regulator),
      pendingRegulator(Regulator, account),
      pendingTotalRegulator(Regulator),
      getVaultPrice(
        Vault,
        getPointsAddress(DeFiat),
        getPointsLpAddress(DeFiat)
      ),
      getVaultPrice(
        Vault,
        getDeFiatAddress(DeFiat),
        getDeFiatLpAddress(DeFiat)
      ),
      getVaultPrice(
        Vault,
        getCircleAddress(DeFiat),
        getCircleLpAddress(DeFiat)
      ),
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

    const pendingRewards = pending.plus(
      stakedBalance.div(totalLocked).times(pendingTotal)
    );
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
  }, [account, ethereum, DeFiat, Vault, Regulator]);

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
