import { Flex } from "components/Flex";
import { HorizontalImage } from "components/HorizontalImage";
import React from "react";
import { Display } from "../../components/Display";
import { Web3ConnectView } from "../../components/Web3ConnectView";
import regulator from "assets/img/regulator.png";
import { RegulatorCard } from "./components/RegulatorCard";
import { RegulatorSummary } from "./components/RegulatorSummary";
import { Box } from "@material-ui/core";

export const Regulator = () => {
  return (
    <Web3ConnectView>
      <Display offset column>
        <Flex center>
          <HorizontalImage image={regulator} alt={"Regulator"} />
        </Flex>
        <Box>
          <RegulatorSummary />
        </Box>
        <Box mt={2}>
          <RegulatorCard />
        </Box>
      </Display>
    </Web3ConnectView>
  );
};
