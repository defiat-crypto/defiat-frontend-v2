import { Flex } from "components/Flex";
import { HorizontalImage } from "components/HorizontalImage";
import React from "react";
import { Display } from "../../components/Display";
import { Web3ConnectView } from "../../components/Web3ConnectView";
import regulator from "assets/img/regulator.png";
import { RegulatorCard } from "./components/RegulatorCard";

export const Regulator = () => {
  return (
    <Display offset column>
      <Web3ConnectView>
        <Flex center>
          <HorizontalImage image={regulator} alt={"Regulator"} />
        </Flex>
        <RegulatorCard />
      </Web3ConnectView>
    </Display>
  );
};
