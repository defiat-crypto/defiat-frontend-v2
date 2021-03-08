import { Box, Button } from "@material-ui/core";
import { ChevronLeftRounded } from "@material-ui/icons";
import { Display } from "components/Display";
import { Flex } from "components/Flex";
import { useHistory } from "react-router";
import { PoolCard } from "./components/PoolCard";
import { PoolHeader } from "./components/PoolHeader";
import { PoolSummary } from "./components/PoolSummary";

export const Pool = () => {
  const history = useHistory();

  return (
    <Display offset column>
      <Flex align="flex-start" mt={2}>
        <Button
          variant="text"
          color="primary"
          startIcon={<ChevronLeftRounded />}
          onClick={() => history.push("/staking")}
        >
          Go Back
        </Button>
      </Flex>
      <PoolHeader />
      <Box mt={2}>
        <PoolSummary />
      </Box>
      <Box mt={2}>
        <PoolCard />
      </Box>
    </Display>
  );
};
