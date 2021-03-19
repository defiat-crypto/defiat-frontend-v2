import BigNumber from "bignumber.js";
import { Pools } from "constants/pools";
import DeFiat from "contexts/DeFiat";
import { getTokenPrice, getOracle, getDeFiatAddress, getAnyStakeContract, pendingAnyStake, getTetherAddress, totalStakedAnyStake, totalStakedAllPoolsAnyStake, totalPendingAnyStake, totalValueStakedAnyStake, totalPoolsStakedAnyStake } from "defiat";
import { useEffect, useMemo } from "react";
import { useCallback, useState } from "react";
import { useWallet } from "use-wallet";
import { getBalance, getDisplayBalance } from "utils";
import { provider } from "web3-core";
import { useBlock } from "./useBlock";
import { useDeFiat } from "./useDeFiat";

interface AnyStakeData {
  totalValueLocked: string;
  tokenPrice: string;
  pendingRewards: string;
  totalValueStaked: string;
  totalStakes: string;
}

export const useAnyStake = () => {
  const [data, setData] = useState<AnyStakeData>();
  const {
    account,
    chainId,
    ethereum,
  }: { account: string; chainId: number; ethereum: provider } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();
  const Oracle = useMemo(() => getOracle(DeFiat), [DeFiat]);

  const AnyStake = useMemo(() => getAnyStakeContract(DeFiat), [DeFiat]);

  const getData = useCallback(async () => {
    const values = await Promise.all([
      getTokenPrice(Oracle, getDeFiatAddress(DeFiat)),
      getTokenPrice(Oracle, getTetherAddress(DeFiat)),
      totalPendingAnyStake(AnyStake, Pools[chainId], account),
      totalStakedAllPoolsAnyStake(Oracle, DeFiat, AnyStake, Pools[chainId]),
      totalValueStakedAnyStake(Oracle, DeFiat, AnyStake, Pools[chainId], account),
      totalPoolsStakedAnyStake(AnyStake, Pools[chainId], account)
    ]);
    const tokenPrice = values[1].dividedBy(values[0]).decimalPlaces(2);
    const totalPending = values[2].dividedBy(1e18).decimalPlaces(6);
    const totalValueLocked = values[3].decimalPlaces(0);
    const totalValueStaked = values[4].decimalPlaces(0);

    setData({
      totalValueLocked: totalValueLocked.toString(),
      tokenPrice: tokenPrice.toString(),
      pendingRewards: totalPending.toString(),
      totalValueStaked: totalValueStaked.toString(),
      totalStakes: values[5]
    });
  }, [account, ethereum, DeFiat, Oracle, AnyStake]);

  useEffect(() => {
    if (!!account && !!DeFiat) {
      getData();
    }
  }, [account, block, DeFiat, getData]);

  return {

    data,
  };
};
