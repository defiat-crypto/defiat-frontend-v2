import { Box, Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import { Pools, StakingPool } from "constants/pools";
import { useState } from "react";
import { useWallet } from "use-wallet";
import { StakingPoolCard } from "./StakingPoolCard";
import { StakingPoolCardV2 } from "./StakingPoolCardV2";

export const StakingPoolList = () => {
  const { chainId } = useWallet();

  const [live, setLive] = useState(true);
  const [cards, setCards] = useState(true);

  return (
    <Flex column>
      <Box my={2}>
        <Flex center>
          <ButtonGroup>
            <Button
              color={live ? "default" : "primary"}
              onClick={() => setLive(true)}
            >
              {live ? <b>AnyStake V2</b> : "AnyStake V2"}
            </Button>
            <Button
              color={live ? "primary" : "default"}
              onClick={() => setLive(false)}
            >
              {live ? "AnyStake V1" : <b>AnyStake V1</b>}
            </Button>
          </ButtonGroup>
        </Flex>
        {/* <Typography variant="h4" align="center">
          <b>Active Pools</b>
        </Typography> */}
      </Box>
      <Grid container spacing={2}>
        {live ? (
          <>
            {chainId &&
              Pools[chainId].map((pool: StakingPool, i: number) => (
                <Grid item md={6} xs={12} key={i}>
                  <StakingPoolCardV2 pool={pool} cards={cards} />
                </Grid>
              ))}
          </>
        ) : (
          <>
            {chainId &&
              Pools[chainId].map((pool: StakingPool, i: number) => (
                <Grid item md={6} xs={12} key={i}>
                  <StakingPoolCard pool={pool} cards={cards} />
                </Grid>
              ))}
          </>
        )}
      </Grid>
    </Flex>
  );
};
