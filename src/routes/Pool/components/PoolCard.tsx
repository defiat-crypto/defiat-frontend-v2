import { Button, Grid, Typography } from "@material-ui/core";
import { LaunchRounded } from "@material-ui/icons";
import { Card } from "components/Card";
import { Pools } from "constants/pools";
import { usePool } from "hooks/usePool";
import { useParams } from "react-router";
import { useWallet } from "use-wallet";

export const PoolCard = () => {
  const { chainId } = useWallet();
  const { pid } = useParams<{ pid: string }>();
  const { logo, name, symbol, address } = Pools[chainId][pid];
  const { data } = usePool(+pid);

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Typography variant="h4" align="center">
            <b>{data ? data.pendingRewards : "0.00"}</b>
          </Typography>
          <Typography variant="subtitle2" align="center" gutterBottom>
            Pending DFT Rewards
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log}
            fullWidth
          >
            Claim Rewards
          </Button>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h4" align="center">
            <b>{data ? data.stakedBalance : "0.00"}</b>
          </Typography>
          <Typography variant="subtitle2" align="center" gutterBottom>
            Staked {symbol}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log}
            fullWidth
          >
            Stake / Unstake
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" endIcon={<LaunchRounded />} fullWidth>
            Get {symbol} on Uniswap
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
