import { Button, ButtonGroup } from "@material-ui/core";
import React, { useMemo } from "react";
import { useWallet } from "use-wallet";
import { AbiItem } from "web3-utils";
import { useDeFiat } from "../../../../hooks/useDeFiat";
import IShitcoin from "../../../../constants/abi/IShitcoin.json";
import Addresses from "../../../../constants/addresses";
import { faucet } from "../../../../defiat";

export const RuggedFaucet = () => {
  const {
    account,
    chainId,
  }: { account: string; chainId: number } = useWallet();

  const DeFiat = useDeFiat();

  const Rugged = useMemo(() => {
    return (
      DeFiat &&
      DeFiat.web3 &&
      new DeFiat.web3.eth.Contract(
        IShitcoin as AbiItem[],
        Addresses.RUG[chainId]
      )
    );
  }, [DeFiat, chainId]);

  const Shitcoin = useMemo(() => {
    return (
      DeFiat &&
      DeFiat.web3 &&
      new DeFiat.web3.eth.Contract(
        IShitcoin as AbiItem[],
        Addresses.SHIT[chainId]
      )
    );
  }, [DeFiat, chainId]);

  return (
    <ButtonGroup>
      <Button onClick={() => faucet(Rugged, account)}>Get RUG</Button>
      <Button onClick={() => faucet(Shitcoin, account)}>Get SHIT</Button>
    </ButtonGroup>
  );
};
