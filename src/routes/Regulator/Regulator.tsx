import React from "react";
import { Display } from "../../components/Display";
import { Web3ConnectView } from "../../components/Web3ConnectView";
import { RegulatorCard } from "./components/RegulatorCard";

export const Regulator = () => {
  return (
    <Display offset center column>
      <Web3ConnectView>
        <RegulatorCard />
      </Web3ConnectView>
    </Display>
  );
};
