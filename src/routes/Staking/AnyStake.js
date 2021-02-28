import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, ThemeProvider, Typography } from '@material-ui/core'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import theme from '../../theme'
import { Flex } from './components/Flex';
import { Summary } from './staking/Summary';
import { Pool } from './staking/Pool';
import { PoolCard } from './staking/PoolCard';
import { Loading } from './staking/Loading';
import DeFiat_Farming from 'contracts/DeFiat_Farming_v15.json';
import { List } from './staking/List';

export const AnyStake = ({
	web3,
	accounts,
	network
}) => {
	const { path } = useRouteMatch();

	const [isLoading, setLoading] = useState(false);


	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Flex align='center' justify='center'>
					<img
						src={require('assets/img/anystake-logo.png')}
						alt="anystake-brand"
						width="384px"
						height="auto"
					/>
				</Flex>
			</Container>
			{isLoading ? (
				<Loading />
			) : (
				<Box>
						<Switch>
							<Route exact path={path}>
								<Summary />
								<List
									accounts={accounts}
									web3={web3}
									network={network}
								/>
							</Route>
							<Route path={`${path}/:poolId`}>
								<Pool
									accounts={accounts}
									web3={web3}
									network={network}
								/>
							</Route>
						</Switch>
				</Box>
			)}
		</ThemeProvider>
	)
}