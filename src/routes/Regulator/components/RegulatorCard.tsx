import { Button, Grid, Typography } from "@material-ui/core";
import { LaunchRounded } from "@material-ui/icons";
import { Card } from "components/Card";
import Addresses from "constants/addresses";
import { useModal } from "hooks/useModal";
import { useRegulator } from "hooks/useRegulator";
import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { getDisplayBalance } from "utils";
import { RegulatorClaimModal } from "./RegulatorClaimModal";
import { RegulatorStakeModal } from "./RegulatorStakeModal";

export const RegulatorCard = () => {
  const { data } = useRegulator();
  const [onPresentStake] = useModal(<RegulatorStakeModal />);
  const [onPresentClaim] = useModal(<RegulatorClaimModal />);

  const { chainId } = useWallet();

  return (
    <Card>
      <Grid container spacing={2}>
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
            <b>{data ? getDisplayBalance(data.stakedBalance) : "0.00"}</b>
          </Typography>
          <Typography variant="subtitle2" align="center" gutterBottom>
            Staked DFTPv2
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
            href={`https://uniswap.info/token/${Addresses.Points[chainId]}`}
            target="_blank"
            rel="noopener,noreferrer"
          >
            Get DFTPv2 on Uniswap
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
