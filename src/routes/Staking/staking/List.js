import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { Flex } from '../components/Flex'
import { PoolCard } from '../staking/PoolCard';


export const List = ({
  accounts,
  web3,
  network,
}) => {

  const [poolMetrics, setPoolMetrics] = useState([]);

	// useEffect(() => {
	// 	loadPoolData();
	// 	const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
	// 		if (!error) {
	// 			loadPoolData();

	// 			return;
	// 		}

	// 		console.error(error);
	// 	})

	// 	return () => subscription.unsubscribe();
	// }, []);

	// const loadPoolData = async () => {
	// 	// const contracts = network.pools.map((pool) => new web3.eth.Contract(DeFiat_Farming.abi, pool.poolAddress));
	// 	// const values = await Promise.all(
	// 	// 	contracts.map((pool) => pool.methods.poolMetrics().call())
	// 	// );
	// 	// setPoolMetrics(values);
	// 	isLoading && setLoading(false);
  // }
  
  return (
    <Flex direction="column">
      <Box my={2}>
        <Typography variant="h4" align="center">
          <b>Active Pools</b>
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {network && network.anystake.map((pool, i) => (
          <Grid item md={6} key={i}>
            <PoolCard
              web3={web3}
              accounts={accounts}
              network={network}
              poolId={i}
              pool={pool}
              poolMetrics={poolMetrics[i]}
              {...pool}
            />
          </Grid>
        ))}
      </Grid>
    </Flex>
  )
}
