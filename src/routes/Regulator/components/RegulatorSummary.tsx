import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import React from "react";
import { Value } from "components/Value";
import { formatAddress, getDisplayBalance, getEtherscanAddress } from "utils";
import { useRegulator } from "hooks/useRegulator";
import { ValueCard } from "components/ValueCard";
import regulator128 from "assets/img/regulator128.png";
import points256 from "assets/img/points256.png";
import logo192 from "assets/img/logo192.png";
import { LaunchRounded } from "@material-ui/icons";
import addresses from "constants/addresses";
import { useWallet } from "use-wallet";

export const RegulatorSummary = () => {
  const { data } = useRegulator();
  const { chainId } = useWallet();

  return (
    <Flex center column>
      <Button
        variant="text"
        color="primary"
        endIcon={<LaunchRounded />}
        href={getEtherscanAddress(chainId, addresses.Regulator[chainId])}
        target="_blank"
      >
        {formatAddress(addresses.Regulator[chainId])}
      </Button>
      <Box pb={2}>
        <Typography variant="h4" align="center">
          $<b>{data ? getDisplayBalance(data.totalValueLocked) : "0.00"}</b>
        </Typography>
        <Typography variant="subtitle2" align="center">
          Total Value Locked
        </Typography>
      </Box>


      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <ValueCard
            value={data ? `${data.peg}:1` : "10:1"}
            name="DFTPv2:DFT Price Peg"
            // endSymbol="DFTPv2:DFT"
            icon={regulator128}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ValueCard
            value={data ? `${getDisplayBalance(data.ratio, 0)}:1` : "10:1"}
            name="Current DFTPv2:DFT Price Ratio"
            icon={regulator128}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ValueCard
            value={data ? getDisplayBalance(data.totalLocked) : "0.00"}
            name="Total DFTP Staked"
            endSymbol="DFTPv2"
            icon={points256}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ValueCard
            value={data ? getDisplayBalance(data.tokenPrice) : "0.00"}
            name="DFT Price"
            startSymbol="$"
            icon={logo192}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValueCard
            value={data ? getDisplayBalance(data.pointsPrice) : "0.00"}
            name="DFTPv2 Price"
            startSymbol="$"
            icon={points256}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValueCard
            value={data ? `${data.apr}%` : "0%"}
            name="APR"
            icon={points256}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValueCard
            value={data ? getDisplayBalance(data.buybackBalance) : "0.00"}
            name="Buyback balance"
            endSymbol="DFT"
            icon={logo192}
          />
        </Grid>
      </Grid>
    </Flex>
  );
};
