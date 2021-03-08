import { Box, Grid } from "@material-ui/core";
import { Flex } from "components/Flex";
import React from "react";
import { Value } from "components/Value";
import { getDisplayBalance } from "utils";
import { useRegulator } from "hooks/useRegulator";

export const RegulatorSummary = () => {
  const { data } = useRegulator();

  return (
    <Box>
      <Flex column>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {/* <Value
              value={data ? getDisplayBalance(data.totalValueLocked) : "0.00"}
              name="Total Value Locked"
              startSymbol="$"
            /> */}
            <Value
              value={data ? data.peg : "0.00"}
              name="Total Value Locked"
              startSymbol="$"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Value
              value={data ? getDisplayBalance(data.pointsPrice) : "0.00"}
              name="DFTPv2 Price"
              startSymbol="$"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Value
              value={data ? getDisplayBalance(data.tokenPrice) : "0.00"}
              name="DFT Price"
              startSymbol="$"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Value
              value={data ? getDisplayBalance(data.pendingRewards) : "0.00"}
              name="Pending Rewards"
              endSymbol="2ND"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Value
              value={data ? getDisplayBalance(data.stakedBalance) : "0.00"}
              name="Staked Balance"
              endSymbol="2ND/ETH"
            />
          </Grid>
        </Grid>
      </Flex>
    </Box>
  );
};
