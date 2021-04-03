import { Box, Grid, Typography } from "@material-ui/core";
import anystake128 from "assets/img/anystake128.png";
import { useWallet } from "use-wallet";
import { useParams } from "react-router";
import { Pools } from "constants/pools";
import { usePool } from "hooks/usePool";
import { ValueCard } from "components/ValueCard";
import { getDisplayBalance } from "utils";
import { Flex } from "components/Flex";

export const PoolSummary = () => {
  const { chainId } = useWallet();
  const { pid } = useParams<{ pid: string }>();
  const { logo, name, symbol, address, decimals } = Pools[chainId][pid];

  const { data } = usePool(+pid);

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
            icon={anystake128}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={data ? getDisplayBalance(data.tokenPrice) : `0.00`}
            startSymbol="$"
            name={`${symbol} Price`}
            icon={logo}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
