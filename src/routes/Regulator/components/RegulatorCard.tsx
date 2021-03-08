import { Box } from "@material-ui/core";
import { Flex } from "../../../components/Flex";
import { Card } from "components/Card";
import { RegulatorSummary } from "./RegulatorSummary";

export const RegulatorCard = () => {
  return (
    <Card>
      <Flex column>
        <Flex center mb={1}></Flex>
        <RegulatorSummary />
      </Flex>
    </Card>
  );
};
