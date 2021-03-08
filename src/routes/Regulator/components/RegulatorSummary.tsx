import { Box, Grid, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import React from "react";
import { Value } from "components/Value";
import { getDisplayBalance } from "utils";
import { useRegulator } from "hooks/useRegulator";
import { ValueCard } from "components/ValueCard";
import regulator128 from "assets/img/regulator128.png";
import points256 from "assets/img/points256.png";
import logo192 from "assets/img/logo192.png";

export const RegulatorSummary = () => {
  const { data } = useRegulator();

  return (
    <Box>
      <Box pb={2}>
        <Typography variant="h4" align="center">
          $<b>{data ? data.totalValueLocked : "0.00"}</b>
        </Typography>
        <Typography variant="subtitle2" align="center">
          Total Value Locked
        </Typography>
      </Box>

      <Flex column>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <ValueCard
              value={data ? `${data.peg}:1` : "10:1"}
              name="DFTPv2:DFT Price Peg"
              // endSymbol="DFTPv2:DFT"
              icon={regulator128}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ValueCard
              value={data ? data.totalLocked : "0.00"}
              name="Total DFTP Staked"
              endSymbol="DFTPv2"
              icon={points256}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ValueCard
              value={data ? data.tokenPrice : "0.00"}
              name="DFT Price"
              startSymbol="$"
              icon={logo192}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ValueCard
              value={data ? data.pointsPrice : "0.00"}
              name="DFTPv2 Price"
              startSymbol="$"
              icon={points256}
            />
          </Grid>
        </Grid>
      </Flex>
    </Box>
  );
};
