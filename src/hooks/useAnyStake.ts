import { Pools } from "constants/pools";
import {
  getDeFiatAddress,
  getAnyStakeContract,
  totalValueStakedAllPoolsAnyStake,
  totalValueStakedAnyStake,
  totalPoolsStakedAnyStake,
  totalPendingVirtualAnyStake,
  getVaultContract,
  getVaultPrice,
  getDeFiatLpAddress,
  getCircleLpAddress,
  getCircleAddress,
  totalPendingAnyStake,
} from "defiat";
import { useEffect, useMemo } from "react";
import { useCallback, useState } from "react";
import { useWallet } from "use-wallet";
import { getDisplayBalance } from "utils";
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
  }: { account: string; chainId: number } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();

  const AnyStake = useMemo(() => getAnyStakeContract(DeFiat), [DeFiat]);
  const Vault = useMemo(() => getVaultContract(DeFiat), [DeFiat]);

  const getData = useCallback(async () => {
    const values = await Promise.all([
      getVaultPrice(
        Vault,
        getDeFiatAddress(DeFiat),
        getDeFiatLpAddress(DeFiat)
      ),
      getVaultPrice(
        Vault,
        getCircleAddress(DeFiat),
        getCircleLpAddress(DeFiat)
      ),
      totalValueStakedAnyStake(
        Vault,
        DeFiat,
        AnyStake,
        Pools[chainId],
        account
      ),
      totalPoolsStakedAnyStake(AnyStake, Pools[chainId], account),
      totalPendingAnyStake(AnyStake, Pools[chainId], account),
      // totalPendingVirtualAnyStake(AnyStake, Pools[chainId], account, block),
      totalValueStakedAllPoolsAnyStake(Vault, DeFiat, AnyStake, Pools[chainId]),
    ]);

    const tokenPrice = values[0].times(1e18).div(values[1]);
    const totalValueStaked = values[2];
    const totalStakes = values[3];
    const totalPending = values[4];
    const totalValueLocked = values[5];

    setData({
      totalValueLocked: getDisplayBalance(totalValueLocked),
      tokenPrice: getDisplayBalance(tokenPrice),
      pendingRewards: getDisplayBalance(totalPending),
      totalValueStaked: getDisplayBalance(totalValueStaked),
      totalStakes,
    });
  }, [account, chainId, DeFiat, AnyStake, Vault, block]);

  useEffect(() => {
    if (!!account && !!DeFiat) {
      getData();
    }
  }, [account, block, DeFiat, getData]);

  return {
    data,
  };
};
