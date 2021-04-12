import { Pools } from "constants/pools";
import {
  BigNumber,
  getAnyStakeAddress,
  getAnyStakeContract,
  getAnyStakeV2Address,
  getAnyStakeV2Contract,
  getOracle,
  getPoolApr,
  getTetherAddress,
  getTokenPrice,
  getVaultContract,
  getVaultV2Contract,
  vipAmountAnyStake,
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
  vipAmount: BigNumber;
}

export const usePoolCardV2 = (pid: number) => {
  const [data, setData] = useState<PoolCardData>();

  const {
    chainId,
    ethereum,
  }: { chainId: number; ethereum: provider } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();

  const TetherAddress = useMemo(() => getTetherAddress(DeFiat), [DeFiat]);
  const AnyStakeV2Address = useMemo(() => getAnyStakeV2Address(DeFiat), [DeFiat]);

  const Oracle = useMemo(() => getOracle(DeFiat), [DeFiat]);
  const AnyStakeV2 = useMemo(() => getAnyStakeV2Contract(DeFiat), [DeFiat]);
  const VaultV2 = useMemo(() => getVaultV2Contract(DeFiat), [DeFiat]);

  const getData = useCallback(async () => {
    const values = await Promise.all([
      getBalance(Pools[chainId][pid].address, AnyStakeV2Address, ethereum),
      getTokenPrice(Oracle, Pools[chainId][pid].address),
      getTokenPrice(Oracle, TetherAddress),
      getPoolApr(DeFiat, VaultV2, AnyStakeV2, Pools[chainId][pid], pid),
      vipAmountAnyStake(AnyStakeV2, pid),
    ]);

    const tokenPrice = values[2].times(1e18).div(values[1]);
    const totalValueStaked = values[0].times(tokenPrice).div(1e18);

    setData({
      totalStaked: getDisplayBalance(values[0], Pools[chainId][pid].decimals),
      totalValueStaked: getDisplayBalance(totalValueStaked), //new BigNumber(values[0]),
      apr: values[3].dividedBy(1e18).decimalPlaces(2).toString(),
      vipAmount: values[4],
    });
  }, [
    chainId,
    ethereum,
    pid,
    AnyStakeV2,
    DeFiat,
    VaultV2,
    AnyStakeV2Address,
    TetherAddress,
    Oracle,
  ]);

  useEffect(() => {
    if (!!ethereum) {
      getData();
    }
  }, [block, ethereum, getData]);

  return { data };
};
