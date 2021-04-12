import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import logo192 from "assets/img/logo192.png";
import anystake128 from "assets/img/anystake128.png";
import spinner256 from "assets/img/spinner256.png";
import { useAnyStakeV2 } from "hooks/useAnyStakeV2";
import { ValueCard } from "components/ValueCard";
import { formatAddress, getEtherscanAddress } from "utils";
import { LaunchRounded } from "@material-ui/icons";
import { useWallet } from "use-wallet";
import addresses from "constants/addresses";
import { useCallback, useState } from "react";
import { useNotifications } from "hooks/useNotifications";

export const StakingSummary = () => {
  const { data, claimAll } = useAnyStakeV2();
  const { chainId } = useWallet();
  const notify = useNotifications();

  const [isTransacting, setIsTransacting] = useState<boolean>(false);
  const handleClaimAll = useCallback(async () => {
    setIsTransacting(true);
    try {
      const txHash = await claimAll();
      if (!!txHash) {
        notify(
          `Claimed all DFT rewards from AnyStake`,
          "success",
          txHash,
          chainId
        );
      }
    } catch {
      notify(`Encountered an error while claiming all DFT rewards`, "error");
    }
    setIsTransacting(false);
  }, [chainId, claimAll, notify]);

  return (
    <Flex center direction="column">
      <Button
        variant="text"
        color="primary"
        endIcon={<LaunchRounded />}
        href={getEtherscanAddress(chainId, addresses.AnyStakeV2[chainId])}
        target="_blank"
      >
        {formatAddress(addresses.AnyStakeV2[chainId])}
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
            tooltip="The price of DFT on Uniswap in USDC"
            icon={logo192}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={data ? data.pendingRewards : "0.00"}
            name="My Claimable Rewards"
            endSymbol="DFT"
            tooltip="My total pending rewards across all of AnyStake. Note: total pending rewards is virtually calculated to give a real-time estimate of your pending DFT rewards. This figure will always be most accurate after a recent interaction with the given pool"
            icon={logo192}
            button={
              <Button
                color="primary"
                // variant="contained"
                onClick={handleClaimAll}
                disabled={!data || data.totalStakes === "0" || isTransacting}
              >
                Claim All
              </Button>
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={data ? data.totalValueStaked : "0.00"}
            startSymbol="$"
            name="My Total Staked Value"
            tooltip="The total value of my tokens staked in AnyStake"
            icon={anystake128}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ValueCard
            value={data ? data.totalStakes : "0"}
            name="My Active AnyStakes"
            tooltip="How many pools I have staked into in AnyStake"
            icon={spinner256}
          />
        </Grid>
      </Grid>
    </Flex>
  );
};
