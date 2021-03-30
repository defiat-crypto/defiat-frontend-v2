import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { LaunchRounded } from "@material-ui/icons";
import { Card } from "components/Card";
import { TextDecoration } from "components/TextDecoration";
import { Pools } from "constants/pools";
import { useModal } from "hooks/useModal";
import { usePool } from "hooks/usePool";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useWallet } from "use-wallet";
import { getDisplayBalance } from "utils";
import { PoolClaimModal } from "./PoolClaimModal";
import { PoolStakeModal } from "./PoolStakeModal";
import vault256 from "assets/img/vault256.png";

export const PoolCard = () => {
  const { chainId } = useWallet();
  const history = useHistory();
  const { pid } = useParams<{ pid: string }>();
  const { address, symbol, decimals } = Pools[chainId][pid];
  const { data } = usePool(+pid);
  const symbolVIP = Pools[chainId][0]["symbol"];
  const [onPresentStake] = useModal(<PoolStakeModal pid={+pid} />);
  const [onPresentClaim] = useModal(<PoolClaimModal pid={+pid} />);
  return (
    <Card>

      <Grid container spacing={2} >
        {data && data.vipAmountUser.isLessThan(data.vipAmount) ?
          <Grid item container spacing={2} >
            <Grid item spacing={2}>
              <img src={vault256} alt="VIP" height="64" width="64" />
            </Grid>
            <Grid item container spacing={2} >
              <Grid item xs={12}>
                <Typography variant="h6">VIP Pool: {getDisplayBalance(data.vipAmount)} DFT Stake Required to Enter</Typography>
                <Typography variant="h6" >
                  <b>VIP Balance: {getDisplayBalance(data.vipAmountUser, 18)}&nbsp;{symbolVIP}
                  </b>
                </Typography>
                <Button
                  onClick={() => history.push(`/staking/0`)}
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Go To VIP Pool
                 </Button>
              </Grid>
              <Grid item xs={12}>
                <TextDecoration width="100%" />
              </Grid>
            </Grid>
          </Grid>
          : ""}
        <Grid item md={6} xs={12}>
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
        <Grid item md={6} xs={12}>
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
            color="primary" disabled={data?.vipAmountUser.isLessThan(data.vipAmount)}
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
