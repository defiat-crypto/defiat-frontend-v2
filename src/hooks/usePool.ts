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
  withdrawAnyStake,
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
      stakedAnyStake(AnyStake, pid, account),
      pendingAnyStake(AnyStake, pid, account),
      getTokenPrice(Oracle, Pools[chainId][pid].address),
      // getTokenPrice(Oracle, getDeFiatAddress(DeFiat)),
    ]);

    setData({
      totalLocked: values[1],
      totalValueLocked: new BigNumber("0"),
      tokenPrice: new BigNumber("0"),
      tokenBalance: values[0],
      pendingRewards: values[3],
      stakedBalance: values[2],
    });
  }, [account, chainId, pid, ethereum, Oracle, AnyStake]);

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
