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

export const usePool = (pid: number) => {
  const [data, setData] = useState<StakingPoolData>();

  const {
    account,
    chainId,
    ethereum,
  }: { account: string; chainId: number; ethereum: provider } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();

  const AnyStake = useMemo(() => getAnyStakeContract(DeFiat), [DeFiat]);
  const Vault = useMemo(() => getVaultContract(DeFiat), [DeFiat]);

  const handleClaim = useCallback(
    async (pid: number) => {
      const txHash = await claimAnyStake(AnyStake, account, pid);
      return txHash;
    },
    [account, AnyStake]
  );

  const handleDeposit = useCallback(
    async (amount: string) => {
      const txHash = await depositAnyStake(AnyStake, account, pid, amount);
      return txHash;
    },
    [account, AnyStake, pid]
  );

  const handleWithdraw = useCallback(
    async (amount: string) => {
      const txHash = await withdrawAnyStake(AnyStake, account, pid, amount);
      return txHash;
    },
    [account, AnyStake, pid]
  );

  const getData = useCallback(async () => {
    const values = await Promise.all([
      getBalance(Pools[chainId][pid].address, account, ethereum),
      totalStakedAnyStake(AnyStake, pid),
      stakingFeeAnyStake(AnyStake, pid),
      stakedAnyStake(AnyStake, pid, account),
      pendingAnyStake(AnyStake, pid, account),
      // pendingVirtualAnyStake(AnyStake, pid, account, block),
      vipAmountAnyStake(AnyStake, pid),
      stakedAnyStake(AnyStake, 0, account),
      AnyStake.methods.poolInfo(pid).call(),
      getPoolApr(DeFiat, Vault, AnyStake, Pools[chainId][pid], pid),
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
        Vault,
        getCircleAddress(DeFiat),
        getCircleLpAddress(DeFiat)
      ),
      getVaultPrice(Vault, poolInfo.stakedToken, poolInfo.lpToken),
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
  }, [account, chainId, pid, ethereum, Vault, AnyStake, DeFiat, block]);

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
