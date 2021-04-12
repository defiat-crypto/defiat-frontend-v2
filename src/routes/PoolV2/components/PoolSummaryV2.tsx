import { Box, Grid, Typography } from "@material-ui/core";
import anystake128 from "assets/img/anystake128.png";
import logo192 from "assets/img/logo192.png";
import { useWallet } from "use-wallet";
import { useParams } from "react-router";
import { Pools } from "constants/pools";
import { usePoolV2 } from "hooks/usePoolV2";
import { ValueCard } from "components/ValueCard";
import { getDisplayBalance } from "utils";

export const PoolSummaryV2 = () => {
  const { chainId } = useWallet();
  const { pid } = useParams<{ pid: string }>();
  const { logo, symbol, decimals } = Pools[chainId][pid];

  const { data } = usePoolV2(+pid);

  return (
    <Box>
      <Box pb={2}>
        <Typography variant="h4" align="center">
          $<b>{data ? getDisplayBalance(data.totalValueLocked) : "0.00"}</b>
        </Typography>
        <Typography variant="subtitle2" align="center">
          Total Value Locked
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={
              data ? getDisplayBalance(data.totalLocked, decimals) : "0.00"
            }
            endSymbol={symbol}
            name="Total Tokens Staked"
            tooltip={`The token amount of ${symbol} staked in AnyStake`}
            icon={anystake128}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={data ? getDisplayBalance(data.tokenPrice) : `0.00`}
            startSymbol="$"
            name={`${symbol} Price`}
            tooltip={`The price of ${symbol} on Uniswap in USDC`}
            icon={logo}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={data ? `${data.apr}` : "0.00"}
            endSymbol="%"
            name="Estimated APR"
            tooltip="APR is estimated based on activity from the past 50K blocks (~1 week) in USDC. Rewards are volume-based, meaning they are not distributed linearly over time. Our calculation: (Avg DFT Rewards/Block over last 50K blocks) * (DFT Price) * (1 year in blocks) / (Pool TVL) * 100"
            icon={logo192}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={data ? data.priceMultiplier : "0"}
            icon={logo192}
            endSymbol="x"
            name="Pool Reward Multiplier"
            tooltip="Rewards that this pool receives relative to other pools"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
