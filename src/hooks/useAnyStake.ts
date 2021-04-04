import BigNumber from "bignumber.js";
import { Pools } from "constants/pools";
import DeFiat from "contexts/DeFiat";
import {
  getTokenPrice,
  getOracle,
  getDeFiatAddress,
  getAnyStakeContract,
  pendingAnyStake,
  getTetherAddress,
  totalStakedAnyStake,
  totalValueStakedAllPoolsAnyStake,
  totalPendingAnyStake,
  totalValueStakedAnyStake,
  totalPoolsStakedAnyStake,
  totalPendingVirtualAnyStake,
  getVaultContract,
} from "defiat";
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
  const Vault = useMemo(() => getVaultContract(DeFiat), [DeFiat]);

  const getData = useCallback(async () => {
    const values = await Promise.all([
      getTokenPrice(Oracle, getDeFiatAddress(DeFiat)),
      getTokenPrice(Oracle, getTetherAddress(DeFiat)),
      totalValueStakedAnyStake(
        Oracle,
        DeFiat,
        AnyStake,
        Pools[chainId],
        account
      ),
      totalPoolsStakedAnyStake(AnyStake, Pools[chainId], account),
    ]);
    const totalPending = await totalPendingVirtualAnyStake(
      AnyStake,
      Pools[chainId],
      account,
      block
    );
    const totalValue = await totalValueStakedAllPoolsAnyStake(
      Oracle,
      DeFiat,
      AnyStake,
      Pools[chainId]
    );
    console.log(totalPending.toString(), totalValue.toString());

    const tokenPrice = values[1].dividedBy(values[0]).multipliedBy(1e18);
    const totalValueLocked = totalValue.multipliedBy(1e18);
    const totalValueStaked = values[2].multipliedBy(1e18);

    setData({
      totalValueLocked: getDisplayBalance(totalValueLocked),
      tokenPrice: getDisplayBalance(tokenPrice),
      pendingRewards: getDisplayBalance(totalPending),
      totalValueStaked: getDisplayBalance(totalValueStaked),
      totalStakes: values[3],
    });
  }, [account, chainId, DeFiat, Oracle, AnyStake, block]);

  useEffect(() => {
    if (!!account && !!DeFiat) {
      getData();
    }
  }, [account, block, DeFiat, getData]);

  return {
    data,
  };
};
