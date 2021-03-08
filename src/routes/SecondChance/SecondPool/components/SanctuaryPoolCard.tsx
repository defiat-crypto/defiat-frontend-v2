import React from "react";
import { Card } from "components/Card";
import { Flex } from "components/Flex";
import sanctuary256 from "assets/img/sanctuary256.png";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Value } from "components/Value";
import { LaunchRounded } from "@material-ui/icons";
import { useModal } from "hooks/useModal";
import { SanctuaryPoolModal } from "./SanctuaryPoolModal";
import { SanctuaryPoolClaimModal } from "./SanctuaryPoolClaimModal";
import Links from "constants/links";
import { useSecondPool } from "hooks/useSecondPool";
import { getDisplayBalance } from "utils";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.light,
  },
}));

export const SanctuaryPoolCard = () => {
  const classes = useStyles();
  const [onPresentStake] = useModal(<SanctuaryPoolModal />);
  const [onPresentClaim] = useModal(<SanctuaryPoolClaimModal />);
  const { data } = useSecondPool();

  return (
    <Card style={{ minWidth: "256px" }}>
      <Flex column>
        <Flex center>
          <img src={sanctuary256} alt="sanctuary" height="96px" />
        </Flex>
        <Typography variant="h5" align="center" color="primary">
          Rug Sanctuary
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Stake 2ND/ETH UNI-V2, Earn 2ND
        </Typography>
        <Flex column>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Value
                value={data ? getDisplayBalance(data.totalValueLocked) : "0.00"}
                name="Total Value Locked"
                startSymbol="$"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Value
                value={data ? getDisplayBalance(data.secondPrice) : "0.00"}
                name="2ND Price"
                startSymbol="$"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Value
                value={data ? getDisplayBalance(data.secondLpPrice) : "0.00"}
                name="2ND LP Price"
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
          <Flex mb={1}>
            <Grid container spacing={1} style={{ maxHeight: "100%" }}>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={onPresentClaim}
                >
                  Claim Rewards
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={onPresentStake}
                  className={classes.button}
                >
                  Stake / Unstake
                </Button>
              </Grid>
            </Grid>
          </Flex>
          <Flex>
            <Button
              fullWidth
              variant="contained"
              endIcon={<LaunchRounded />}
              href={Links.uniswapSecondLp}
              target="_blank"
              rel="noopener,noreferrer"
            >
              Add 2ND/ETH Liquidity
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
