import { Pools } from "constants/pools";
import {
  BigNumber,
  claimAnyStake,
  depositAnyStake,
  getAnyStakeContract,
  stakedAnyStake,
  totalStakedAnyStake,
  stakingFeeAnyStake,
  withdrawAnyStake,
  vipAmountAnyStake,
  pendingVirtualAnyStake,
  getVaultContract,
  getVaultPrice,
  getCircleAddress,
  getCircleLpAddress,
  getPoolApr,
  pendingAnyStake,
  getAnyStakeV2Contract,
  getVaultV2Contract,
  pendingVirtualAnyStakeV2,
} from "defiat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { getBalance } from "utils";
import { provider } from "web3-core";
import { useBlock } from "./useBlock";
import { useDeFiat } from "./useDeFiat";

interface StakingPoolData {
  totalValueLocked: BigNumber;
  totalLocked: BigNumber;
  tokenPrice: BigNumber;
  pendingRewards: BigNumber;
  stakedBalance: BigNumber;
  tokenBalance: BigNumber;
  stakingFee: number;
  vipAmount: BigNumber;
  vipAmountUser: BigNumber;
  apr: string;
  priceMultiplier: string;
}

export const usePoolV2 = (pid: number) => {
  const [data, setData] = useState<StakingPoolData>();

  const {
    account,
    chainId,
    ethereum,
  }: { account: string; chainId: number; ethereum: provider } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();

  const AnyStakeV2 = useMemo(() => getAnyStakeV2Contract(DeFiat), [DeFiat]);
  const VaultV2 = useMemo(() => getVaultV2Contract(DeFiat), [DeFiat]);

  const handleClaim = useCallback(
    async (pid: number) => {
      const txHash = await claimAnyStake(AnyStakeV2, account, pid);
      return txHash;
    },
    [account, AnyStakeV2]
  );

  const handleDeposit = useCallback(
    async (amount: string) => {
      const txHash = await depositAnyStake(AnyStakeV2, account, pid, amount);
      return txHash;
    },
    [account, AnyStakeV2, pid]
  );

  const handleWithdraw = useCallback(
    async (amount: string) => {
      const txHash = await withdrawAnyStake(AnyStakeV2, account, pid, amount);
      return txHash;
    },
    [account, AnyStakeV2, pid]
  );

  const getData = useCallback(async () => {
    const values = await Promise.all([
      getBalance(Pools[chainId][pid].address, account, ethereum),
      totalStakedAnyStake(AnyStakeV2, pid),
      stakingFeeAnyStake(AnyStakeV2, pid),
      stakedAnyStake(AnyStakeV2, pid, account),
      // pendingAnyStake(AnyStakeV2, pid, account),
      pendingVirtualAnyStakeV2(
        AnyStakeV2,
        VaultV2,
        DeFiat,
        ethereum,
        pid,
        account,
        block
      ),
      vipAmountAnyStake(AnyStakeV2, pid),
      stakedAnyStake(AnyStakeV2, 0, account),
      AnyStakeV2.methods.poolInfo(pid).call(),
      getPoolApr(DeFiat, VaultV2, AnyStakeV2, Pools[chainId][pid], pid),
    ]);

    const tokenBalance = values[0];
    const totalLocked = values[1];
    const stakingFee = values[2].div(10).toNumber();
    const stakedBalance = values[3];
    const pendingRewards = values[4];
    const vipAmount = values[5];
    const vipAmountUser = values[6];
    const poolInfo = values[7];
    const priceMultiplier = (values[7].allocPoint / 100).toString();
    const apr = values[8].div(1e18).decimalPlaces(2).toString();

    const prices = await Promise.all([
      getVaultPrice(
        VaultV2,
        getCircleAddress(DeFiat),
        getCircleLpAddress(DeFiat)
      ),
      getVaultPrice(VaultV2, poolInfo.stakedToken, poolInfo.lpToken),
    ]);

    const tokenPrice = prices[1].times(1e18).div(prices[0]);
    const totalValueLocked = tokenPrice
      .times(totalLocked)
      .div(new BigNumber(10).pow(Pools[chainId][pid].decimals));

    setData({
      tokenBalance,
      totalLocked,
      stakingFee,
      tokenPrice,
      totalValueLocked,
      stakedBalance,
      pendingRewards,
      vipAmount,
      vipAmountUser,
      apr,
      priceMultiplier,
    });
  }, [account, chainId, pid, ethereum, VaultV2, AnyStakeV2, DeFiat, block]);

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
