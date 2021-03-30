import { Pools } from "constants/pools";
import {
  BigNumber,
  claimAnyStake,
  depositAnyStake,
  getAnyStakeContract,
  getDeFiatAddress,
  getOracle,
  getTokenPrice,
  pendingAnyStake,
  stakedAnyStake,
  totalStakedAnyStake,
  stakingFeeAnyStake,
  withdrawAnyStake,
  getTetherAddress,
  vipAmountAnyStake,
} from "defiat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { getBalance, getDisplayBalance } from "utils";
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
  const Oracle = useMemo(() => getOracle(DeFiat), [DeFiat]);

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
      getTokenPrice(Oracle, Pools[chainId][pid].address),
      getTokenPrice(Oracle, getTetherAddress(DeFiat)),
      vipAmountAnyStake(AnyStake, pid),
      stakedAnyStake(AnyStake, 0, account)
      // getTokenPrice(Oracle, getDeFiatAddress(DeFiat)),
    ]);

    const tokenPrice = values[6].multipliedBy(1e18).dividedBy(values[5]);
    const totalValueLocked = tokenPrice
      .times(values[1])
      .div(new BigNumber(10).pow(Pools[chainId][pid].decimals));

    setData({
      tokenBalance: values[0],
      totalLocked: values[1],
      stakingFee: values[2].div(10).toNumber(),
      tokenPrice,
      totalValueLocked,
      stakedBalance: values[3],
      pendingRewards: values[4],
      vipAmount: values[7],
      vipAmountUser: values[8]
    });
  }, [account, chainId, pid, ethereum, Oracle, AnyStake, DeFiat]);

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
