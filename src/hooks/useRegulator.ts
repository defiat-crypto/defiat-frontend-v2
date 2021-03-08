import BigNumber from "bignumber.js";
import {
  claimRegulator,
  depositRegulator,
  getRegulatorContract,
  withdrawRegulator,
} from "defiat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { useBlock } from "./useBlock";
import { useDeFiat } from "./useDeFiat";

interface RegulatorData {
  pointsPrice: BigNumber;
  tokenPrice: BigNumber;
  peg: string;
  pendingRewards: BigNumber;
  tokenBalance: BigNumber;
  stakedBalance: BigNumber;
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
