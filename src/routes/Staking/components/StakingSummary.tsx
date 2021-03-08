import { Box, Grid, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import { SummaryCard } from "components/SummaryCard";
import logo192 from "assets/img/logo192.png";
import anystake128 from "assets/img/anystake128.png";
import spinner256 from "assets/img/spinner256.png";
import { useAnyStake } from "hooks/useAnyStake";

export const StakingSummary = () => {
  const { data } = useAnyStake();

  return (
    <Flex direction="column">
      <Box pb={2}>
        <Typography variant="h4" align="center">
          $<b>{data ? data.totalValueLocked : "0.00"}</b>
        </Typography>
        <Typography variant="subtitle2" align="center">
          Total Value Locked
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item md={6}>
          <SummaryCard
            id="tokenPrice"
            header={`$${data ? data.tokenPrice : "0.00"}`}
            title="DFT Price"
            color="info"
            tooltip="The total amount of DFT in your connected ERC20 wallet."
            icon={logo192}
          />
        </Grid>
        <Grid item md={6}>
          <SummaryCard
            id="claimableRewards"
            header={`${data ? data.pendingRewards : "0.00"} DFT`}
            title="My Claimable Rewards"
            color="info"
            tooltip="The total amount of DFT in your connected ERC20 wallet."
            icon={logo192}
          />
        </Grid>
        <Grid item md={6}>
          <SummaryCard
            id="lpValue"
            header={`$${data ? data.totalValueStaked : "0.00"}`}
            title="My Total Staked Value"
            color="info"
            tooltip="The total amount of DFT in your connected ERC20 wallet."
            icon={anystake128}
          />
        </Grid>
        <Grid item md={6}>
          <SummaryCard
            id="activeStakes"
            header={data ? data.totalStakes : "0"}
            title="My Active AnyStakes"
            color="info"
            tooltip="The total amount of DFT in your connected ERC20 wallet."
            icon={spinner256}
          />
        </Grid>
      </Grid>
    </Flex>
  );
};
