import { Typography } from "@material-ui/core";
import React from "react";
import { Web3ConnectView } from "components/Web3ConnectView";
import { RecyclerCard } from "./components/RecyclerCard";
import { SecondWrapper } from "../SecondWrapper";
import { useWallet } from "use-wallet";
import { RuggedFaucet } from "./components/RuggedFaucet";

export const SecondRecycler = () => {
  const { chainId } = useWallet();

  return (
    <Web3ConnectView>
      <SecondWrapper
        children={[
          <RecyclerCard key={0} />,
          <Typography key={1} variant="body1" align="center">
            * Receive up to 200% extra 2ND tokens when you recycle while holding
            DFT! (1 DFT = +1%)
          </Typography>,
          chainId === 4 && <RuggedFaucet key={2} />,
        ]}
      />
    </Web3ConnectView>
  );
};
