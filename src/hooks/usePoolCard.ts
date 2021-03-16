import { Pools } from "constants/pools";
import {
  BigNumber,
  getAnyStakeAddress,
  getAnyStakeContract,
  getOracle,
  getTetherAddress,
  getTokenPrice,
} from "defiat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { getBalance, getDisplayBalance } from "utils";
import { provider } from "web3-core";
import { useBlock } from "./useBlock";
import { useDeFiat } from "./useDeFiat";

interface PoolCardData {
  totalStaked: string;
  totalValueStaked: string;
  apr: string;
}

export const usePoolCard = (pid: number) => {
  const [data, setData] = useState<PoolCardData>();

  const {
    chainId,
    ethereum,
  }: { chainId: number; ethereum: provider } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();

  const TetherAddress = useMemo(() => getTetherAddress(DeFiat), [DeFiat]);
  const AnyStakeAddress = useMemo(() => getAnyStakeAddress(DeFiat), [DeFiat]);

  const Oracle = useMemo(() => getOracle(DeFiat), [DeFiat]);
  const AnyStake = useMemo(() => getAnyStakeContract(DeFiat), [DeFiat]);

  const getPoolValueStaked = async () => {
    return "0";
  };

  const getPoolApr = async () => {
    return "0";
  };

  const getData = useCallback(async () => {
    const values = await Promise.all([
      getBalance(Pools[chainId][pid].address, AnyStakeAddress, ethereum),
      getTokenPrice(Oracle, Pools[chainId][pid].address),
      getTokenPrice(Oracle, TetherAddress),
      // getPoolApr,
    ]);

    const tokenPrice = values[2].times(1e18).div(values[1]);
    const totalValueStaked = values[0].times(tokenPrice).div(1e18);

    setData({
      totalStaked: getDisplayBalance(values[0], Pools[chainId][pid].decimals),
      totalValueStaked: getDisplayBalance(totalValueStaked), //new BigNumber(values[0]),
      apr: "N/A", //values[1],
    });
  }, [chainId, ethereum, pid, AnyStakeAddress, TetherAddress, Oracle]);

  useEffect(() => {
    if (!!ethereum) {
      getData();
    }
  }, [block, ethereum, getData]);

  return { data };
};
