import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import { approve, getAllowance } from "../utils/erc20";
import { provider } from "web3-core";
import { useBlock } from "./useBlock";

export const useApprove = (tokenAddress: string, spenderAddress: string) => {
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet();
  const block = useBlock();
  const [allowance, setAllowance] = useState<BigNumber>();

  const handleApprove = useCallback(async () => {
    const txHash = await approve(
      tokenAddress,
      spenderAddress,
      ethereum,
      account
    );
    return txHash;
  }, [account, ethereum, tokenAddress, spenderAddress]);

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      tokenAddress,
      spenderAddress,
      ethereum,
      account
    );
    console.log("ALLOWANCE", allowance.toString());
    if (allowance) {
      setAllowance(allowance);
    }
  }, [account, ethereum, tokenAddress, spenderAddress]);

  useEffect(() => {
    if (!!account && !!ethereum) {
      fetchAllowance();
    }
  }, [account, block, ethereum, tokenAddress, spenderAddress, fetchAllowance]);

  return {
    allowance,
    approve: handleApprove,
  };
};
