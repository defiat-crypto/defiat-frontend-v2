import { Box, Grid, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import { Pools, StakingPool } from "constants/pools";
import React from "react";
import { useWallet } from "use-wallet";
import { PoolCard } from "./PoolCard";

export const PoolList = () => {
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
            <Grid item md={6} key={i}>
              <PoolCard pool={pool} />
            </Grid>
          ))}
      </Grid>
    </Flex>
  );
};
