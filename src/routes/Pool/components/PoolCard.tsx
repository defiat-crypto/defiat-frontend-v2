import { Button, Grid, Typography } from "@material-ui/core";
import { LaunchRounded } from "@material-ui/icons";
import { Card } from "components/Card";
import { Pools } from "constants/pools";
import { useModal } from "hooks/useModal";
import { usePool } from "hooks/usePool";
import { useParams } from "react-router";
import { useWallet } from "use-wallet";
import { getDisplayBalance } from "utils";
import { PoolClaimModal } from "./PoolClaimModal";
import { PoolStakeModal } from "./PoolStakeModal";

export const PoolCard = () => {
  const { chainId } = useWallet();
  const { pid } = useParams<{ pid: string }>();
  const { address, symbol, decimals } = Pools[chainId][pid];
  const { data } = usePool(+pid);

  const [onPresentStake] = useModal(<PoolStakeModal pid={+pid} />);
  const [onPresentClaim] = useModal(<PoolClaimModal pid={+pid} />);

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Typography variant="h4" align="center">
            <b>{data ? getDisplayBalance(data.pendingRewards) : "0.00"}</b>
          </Typography>
          <Typography variant="subtitle2" align="center" gutterBottom>
            Pending DFT Rewards
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onPresentClaim}
            fullWidth
          >
            Claim Rewards
          </Button>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h4" align="center">
            <b>
              {data ? getDisplayBalance(data.stakedBalance, decimals) : "0.00"}
            </b>
          </Typography>
          <Typography variant="subtitle2" align="center" gutterBottom>
            Staked {symbol}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onPresentStake}
            fullWidth
          >
            Stake / Unstake
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            endIcon={<LaunchRounded />}
            fullWidth
            href={
              +pid < 2
                ? `https://uniswap.info/pair/${address}`
                : `https://uniswap.info/token/${address}`
            }
            target="_blank"
            rel="noopener,noreferrer"
          >
            Get {symbol} on Uniswap
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
