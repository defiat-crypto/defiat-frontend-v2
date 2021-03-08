import { Box, Grid, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import React from "react";
import { SummaryCard } from "./SummaryCard";
import logo192 from "assets/img/logo192.png";

export const Summary = () => {
  return (
    <Flex direction="column">
      <Box pb={2}>
        <Typography variant="h4" align="center">
          <b>1,000.00</b>Ξ
        </Typography>
        <Typography variant="subtitle2" align="center">
          Total Value Locked
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item md={6}>
          <SummaryCard
            id="balance"
            header="240.05"
            title="DFT Balance"
            color="info"
            tooltip="The total amount of DFT in your connected ERC20 wallet."
            icon={logo192}
          />
        </Grid>
        <Grid item md={6}>
          <SummaryCard
            id="claimableRewards"
            header="22.10 DFT"
            title="Claimable Rewards"
            color="info"
            tooltip="The total amount of DFT in your connected ERC20 wallet."
            icon={logo192}
          />
        </Grid>
        <Grid item md={6}>
          <SummaryCard
            id="lpValue"
            header="0.8095 ETH"
            title="My Staked Liquidity Value"
            color="info"
            tooltip="The total amount of DFT in your connected ERC20 wallet."
            icon={logo192}
          />
        </Grid>
        <Grid item md={6}>
          <SummaryCard
            id="activeStakes"
            header="4"
            title="My Active AnyStakes"
            color="info"
            tooltip="The total amount of DFT in your connected ERC20 wallet."
            icon={logo192}
          />
        </Grid>
      </Grid>
    </Flex>
  );
};
