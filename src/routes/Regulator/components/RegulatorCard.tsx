import { Box } from "@material-ui/core";
import React from "react";
import { Flex } from "../../../components/Flex";
import { HorizontalImage } from "../../../components/HorizontalImage";
import Regulator from "../../../assets/img/regulator.png";
import { Card } from "components/Card";

export const RegulatorCard = () => {
  return (
    <Card>
      <Flex column>
        <Flex center mb={1}>
          {/* <Box p={2}> */}
          <HorizontalImage image={Regulator} alt={"Regulator"} />
          {/* </Box> */}
        </Flex>
      </Flex>
    </Card>
  );
};
