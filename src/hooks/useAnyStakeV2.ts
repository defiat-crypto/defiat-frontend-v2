import { Pools } from "constants/pools";
import {
  getDeFiatAddress,
  totalValueStakedAllPoolsAnyStake,
  totalValueStakedAnyStake,
  totalPoolsStakedAnyStake,
  // totalPendingVirtualAnyStake,
  getVaultContract,
  getVaultPrice,
  getDeFiatLpAddress,
  getCircleLpAddress,
  getCircleAddress,
  getAnyStakeV2Contract,
  totalPendingAnyStake,
  getVaultV2Contract,
  claimAllAnyStake,
  totalPendingVirtualAnyStakeV2,
} from "defiat";
import { useEffect, useMemo } from "react";
import { useCallback, useState } from "react";
import { useWallet } from "use-wallet";
import { getDisplayBalance } from "utils";
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

export const useAnyStakeV2 = () => {
  const [data, setData] = useState<AnyStakeData>();
  const {
    account,
    chainId,
    ethereum,
  }: { account: string; chainId: number; ethereum: provider } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();

  const AnyStakeV2 = useMemo(() => getAnyStakeV2Contract(DeFiat), [DeFiat]);
  const VaultV2 = useMemo(() => getVaultV2Contract(DeFiat), [DeFiat]);

  const handleClaiAll = useCallback(async () => {
    const txHash = await claimAllAnyStake(AnyStakeV2, account);
    return txHash;
  }, [account, AnyStakeV2]);

  const getData = useCallback(async () => {
    const values = await Promise.all([
      getVaultPrice(
        VaultV2,
        getDeFiatAddress(DeFiat),
        getDeFiatLpAddress(DeFiat)
      ),
      getVaultPrice(
        VaultV2,
        getCircleAddress(DeFiat),
        getCircleLpAddress(DeFiat)
      ),
      totalValueStakedAnyStake(
        VaultV2,
        DeFiat,
        AnyStakeV2,
        Pools[chainId],
        account
      ),
      totalPoolsStakedAnyStake(AnyStakeV2, Pools[chainId], account),
      // totalPendingVirtualAnyStake(AnyStakeV2, Pools[chainId], account, block),
      // totalPendingAnyStake(AnyStakeV2, Pools[chainId], account),
      totalPendingVirtualAnyStakeV2(
        AnyStakeV2,
        VaultV2,
        DeFiat,
        ethereum,
        Pools[chainId],
        account,
        block
      ),
      totalValueStakedAllPoolsAnyStake(
        VaultV2,
        DeFiat,
        AnyStakeV2,
        Pools[chainId]
      ),
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
  }, [account, chainId, DeFiat, AnyStakeV2, VaultV2, ethereum, block]);

  useEffect(() => {
    if (!!account && !!DeFiat) {
      getData();
    }
  }, [account, block, DeFiat, getData]);

  return {
    data,
    claimAll: handleClaiAll,
  };
};
