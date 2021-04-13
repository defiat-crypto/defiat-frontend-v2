import { Box, Button } from "@material-ui/core";
import { ChevronLeftRounded } from "@material-ui/icons";
import { Display } from "components/Display";
import { Flex } from "components/Flex";
import { Web3ConnectView } from "components/Web3ConnectView";
import { useHistory } from "react-router";
import { PoolCardV2 } from "./components/PoolCardV2";
import { PoolHeaderV2 } from "./components/PoolHeaderV2";
import { PoolSummaryV2 } from "./components/PoolSummaryV2";

export const PoolV2 = () => {
  const history = useHistory();

  return (
    <Web3ConnectView>
      <Display offset column>
        <Flex align="flex-start" mt={2}>
          <Button
            variant="text"
            color="primary"
            startIcon={<ChevronLeftRounded />}
            onClick={() => history.push("/anystake")}
          >
            Go Back
          </Button>
        </Flex>
        <PoolHeaderV2 />
        <Box mt={2}>
          <PoolSummaryV2 />
        </Box>
        <Box mt={2}>
          <PoolCardV2 />
        </Box>
      </Display>
    </Web3ConnectView>
  );
};
