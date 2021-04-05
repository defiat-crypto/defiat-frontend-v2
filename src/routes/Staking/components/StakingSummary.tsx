import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import logo192 from "assets/img/logo192.png";
import anystake128 from "assets/img/anystake128.png";
import spinner256 from "assets/img/spinner256.png";
import { useAnyStake } from "hooks/useAnyStake";
import { ValueCard } from "components/ValueCard";
import { formatAddress, getEtherscanAddress } from "utils";
import { LaunchRounded } from "@material-ui/icons";
import { useWallet } from "use-wallet";
import addresses from "constants/addresses";

export const StakingSummary = () => {
  const { data } = useAnyStake();
  const { chainId } = useWallet();

  return (
    <Flex center direction="column">
      <Button
        variant="text"
        color="primary"
        endIcon={<LaunchRounded />}
        href={getEtherscanAddress(chainId, addresses.AnyStake[chainId])}
        target="_blank"
      >
        {formatAddress(addresses.AnyStake[chainId])}
      </Button>
      <Box pb={2}>
        <Typography variant="h4" align="center">
          $<b>{data ? data.totalValueLocked : "0.00"}</b>
        </Typography>
        <Typography variant="subtitle2" align="center">
          Total Value Locked
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={data ? data.tokenPrice : "0.00"}
            startSymbol="$"
            name="DFT Price"
            icon={logo192}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={data ? data.pendingRewards : "0.00"}
            name="My Claimable Rewards"
            endSymbol="DFT"
            icon={logo192}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={data ? data.totalValueStaked : "0.00"}
            startSymbol="$"
            name="My Total Staked Value"
            icon={anystake128}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={data ? data.totalStakes : "0"}
            name="My Active AnyStakes"
            icon={spinner256}
          />
        </Grid>
      </Grid>
    </Flex>
  );
};
