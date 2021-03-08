import { BigNumber } from "@ethersproject/bignumber";
import { useState } from "react";

interface AnyStakeData {
  totalValueLocked: BigNumber;
  tokenPrice: BigNumber;
  pendingRewards: BigNumber;
  totalValueStaked: BigNumber;
  totalStakes: string;
}

export const useAnyStake = () => {
  const [data, setData] = useState<AnyStakeData>();

  return {
    data,
  };
};
