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
  const Oracle = useMemo(() => getOracle(DeFiat), [DeFiat]);

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
      pendingRegulator(Regulator, account),
      getTokenPrice(Oracle, getPointsAddress(DeFiat)),
      getTokenPrice(Oracle, getDeFiatAddress(DeFiat)),
      getTokenPrice(Oracle, getTetherAddress(DeFiat)),
    ]);

    const tokenPrice = values[7].multipliedBy(1e18).dividedBy(values[6]);
    const pointsPrice = values[7].multipliedBy(1e18).dividedBy(values[5]);
    const totalValueLocked = pointsPrice.times(values[1]).div(1e18);

    setData({
      totalLocked: values[1],
      totalValueLocked,
      pointsPrice,
      tokenPrice,
      tokenBalance: values[0],
      peg: +values[2] / 1000,
      pendingRewards: values[4],
      stakedBalance: values[3],
    });
  }, [account, ethereum, DeFiat, Oracle, Regulator]);

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
