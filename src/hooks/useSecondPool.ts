import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import Addresses from "../constants/addresses";
import {
  getRugSanctuaryContract,
  stakedPool,
  pendingPool,
  BigNumber,
  withdrawPool,
  depositPool,
  getRugSanctuaryAddress,
  getTokenPrice,
  getOracle,
  getSecondAddress,
  getSecondLpAddress,
  getTetherAddress,
} from "../defiat";
import { getBalance } from "../utils";
import { useBlock } from "./useBlock";
import { useDeFiat } from "./useDeFiat";

interface SecondPoolData {
  pendingRewards: BigNumber;
  tokenBalance: BigNumber;
  stakedBalance: BigNumber;
  secondPrice: BigNumber;
  secondLpPrice: BigNumber;
  totalValueLocked: BigNumber;
}

export const useSecondPool = () => {
  const [data, setData] = useState<SecondPoolData>();

  const {
    account,
    ethereum,
    chainId,
  }: { account: string; ethereum: provider; chainId: number } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();

  const RugSanctuary = useMemo(() => getRugSanctuaryContract(DeFiat), [DeFiat]);
  const Oracle = useMemo(() => getOracle(DeFiat), [DeFiat]);

  const handleClaim = useCallback(async () => {
    const txHash = await withdrawPool(RugSanctuary, account, "0");
    return txHash;
  }, [account, RugSanctuary]);

  const handleDeposit = useCallback(
    async (deposit: string) => {
      const txHash = await depositPool(RugSanctuary, account, deposit);
      return txHash;
    },
    [account, RugSanctuary]
  );

  const handleWithdraw = useCallback(
    async (withdraw: string) => {
      const txHash = await withdrawPool(RugSanctuary, account, withdraw);
      return txHash;
    },
    [account, RugSanctuary]
  );

  const fetchData = useCallback(async () => {
    const values = await Promise.all([
      getBalance(getSecondLpAddress(DeFiat), account, ethereum),
      stakedPool(RugSanctuary, account),
      pendingPool(RugSanctuary, account),
      getBalance(
        getSecondLpAddress(DeFiat),
        getRugSanctuaryAddress(DeFiat),
        ethereum
      ),
      getTokenPrice(Oracle, getSecondAddress(DeFiat)),
      getTokenPrice(Oracle, getSecondLpAddress(DeFiat)),
      getTokenPrice(Oracle, getTetherAddress(DeFiat)),
    ]);

    setData({
      tokenBalance: values[0],
      stakedBalance: values[1],
      pendingRewards: values[2],
      secondPrice: values[6].multipliedBy(1e18).dividedBy(values[4]),
      secondLpPrice: values[5].multipliedBy(values[6]).dividedBy(1e18),
      totalValueLocked: values[5]
        .multipliedBy(values[6])
        .multipliedBy(values[3])
        .dividedBy(1e36),
    });
  }, [account, ethereum, DeFiat, Oracle, RugSanctuary]);

  useEffect(() => {
    if (!!account && !!DeFiat) {
      fetchData();
    }
  }, [account, block, DeFiat, fetchData]);

  return {
    data,
    claim: handleClaim,
    deposit: handleDeposit,
    withdraw: handleWithdraw,
  };
};
