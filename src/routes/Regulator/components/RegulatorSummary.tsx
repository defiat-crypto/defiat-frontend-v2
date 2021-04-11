import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
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

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ValueCard
            value={data ? `${data.peg}:1` : "10:1"}
            name="Target DFTPv2:DFT Price Ratio"
            tooltip="The target price ratio of DFTPv2:DFT on Uniswap the Regulator works to fulfill. On withdrawals, the Regulator will check the price ratio of DFTPv2:DFT and perform a buyback of DFTPv2 or DFT to regulate the prices. If DFTPv2 is below the peg, we sell the DFT Buyback Balance to buy DFTPv2 and burn the proceeds. If DFTPv2 is above the peg, we sell DFTPv2 withdrawal fees to buy DFT and add to the reward pool"
            icon={regulator128}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ValueCard
            value={data ? `${getDisplayBalance(data.ratio, 0)}:1` : "10:1"}
            name="Current DFTPv2:DFT Price Ratio"
            tooltip="The current price ratio of DFTPv2:DFT on Uniswap"
            icon={regulator128}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ValueCard
            value={data ? getDisplayBalance(data.totalLocked) : "0.00"}
            name="Total DFTPv2 Staked"
            endSymbol="DFTPv2"
            tooltip="The total amount of DFTPv2 staked in Regulator"
            icon={points256}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ValueCard
            value={data ? getDisplayBalance(data.tokenPrice) : "0.00"}
            name="DFT Price"
            startSymbol="$"
            tooltip="The price of DFT on Uniswap in USDC"
            icon={logo192}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValueCard
            value={data ? getDisplayBalance(data.pointsPrice) : "0.00"}
            name="DFTPv2 Price"
            startSymbol="$"
            tooltip="The price of DFTPv2 on Uniswap in USDC"
            icon={points256}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValueCard
            value={data ? `${data.apr}%` : "0%"}
            name="Estimated APR"
            tooltip="APR is estimated based on activity from the past 50K blocks (~1 week) in USDC. Rewards are volume-based, meaning they are not distributed linearly over time. Our calculation: (Avg DFT Rewards/Block over last 50K blocks) * (DFT Price) * (1 year in blocks) / (Pool TVL) * 100"
            icon={logo192}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValueCard
            value={data ? getDisplayBalance(data.buybackBalance) : "0.00"}
            name="Buyback Balance"
            endSymbol="DFT"
            tooltip="The amount of DFT the Regulator has accumulated to perform DFTPv2 buybacks when the price of DFTPv2 is below the peg"
            icon={logo192}
          />
        </Grid>
      </Grid>
    </Flex>
  );
};
