import { BigNumber } from "@ethersproject/bignumber";
import {
  claimAnyStake,
  depositAnyStake,
  getAnyStakeContract,
  withdrawAnyStake,
} from "defiat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { useBlock } from "./useBlock";
import { useDeFiat } from "./useDeFiat";

interface StakingPoolData {
  totalValueStaked: BigNumber;
  totalStaked: BigNumber;
  tokenPrice: BigNumber;
  pendingRewards: BigNumber;
  stakedTokens: BigNumber;
}

export const usePool = (pid: number) => {
  const [data, setData] = useState<StakingPoolData>();

  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();

  const AnyStake = useMemo(() => getAnyStakeContract(DeFiat), [DeFiat]);

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
    [account, AnyStake]
  );

  const handleWithdraw = useCallback(
    async (amount: string) => {
      const txHash = await withdrawAnyStake(AnyStake, account, pid, amount);
      return txHash;
    },
    [account, AnyStake]
  );

  const getData = useCallback(async () => {
    // const userInfo = await getRegulatorInfo()
    const values = await Promise.all([]);

    if (values) {
      // setData({
      // })
    }
  }, []);

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
