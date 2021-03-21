import { Box, Grid, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import { Pools, StakingPool } from "constants/pools";
import { useWallet } from "use-wallet";
import { StakingPoolCard } from "./StakingPoolCard";

export const StakingPoolList = () => {
  const { chainId } = useWallet();

  return (
    <Flex column>
      <Box my={2}>
        <Typography variant="h4" align="center">
          <b>Active Pools</b>
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {chainId &&
          Pools[chainId].map((pool: StakingPool, i: number) => (
            <Grid item md={6} xs={12} key={i}>
              <StakingPoolCard pool={pool} />
            </Grid>
          ))}
      </Grid>
    </Flex>
  );
};
