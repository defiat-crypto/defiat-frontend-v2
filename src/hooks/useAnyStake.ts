import { BigNumber } from "@ethersproject/bignumber";
import { useState } from "react";

interface AnyStakeData {
  totalValueLocked: string;
  tokenPrice: string;
  pendingRewards: string;
  totalValueStaked: string;
  totalStakes: string;
}

export const useAnyStake = () => {
  const [data, setData] = useState<AnyStakeData>();

  return {
    data,
  };
};
