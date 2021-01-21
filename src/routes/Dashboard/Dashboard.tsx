import { Box, Grid, Toolbar } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../components/Flex'
import { Header } from '../../components/Header'
import { DashboardGraphCard } from './components/DashboardGraphCard'
import { DashboardPointsCard } from './components/DashboardPointsCard'
import { DashboardValueCard } from './components/DashboardValueCard'

export const Dashboard = () => {
  return (
    <Box>
      <Toolbar />
      <Flex center mt={2}>
        <Header
          title="Dashboard"
          subtitle="DeFiat Network Statistics"
          align="center"
        />
      </Flex>
      <Flex mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <DashboardValueCard
              name="DFT Balance"
              value="1000"
              endSymbol="DFT"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DashboardValueCard
              name="DFT Price"
              value="1"
              startSymbol="$"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DashboardValueCard
              name="ETH Price"
              value="1300"
              startSymbol="$"
            />
          </Grid>
        </Grid>
      </Flex>
      <Flex mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} style={{flex: '1'}}>
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <DashboardValueCard
                  name="DFT Total Supply"
                  value="490000"
                  endSymbol="DFT"
                />
              </Grid>
              <Grid item xs={12}>
                <DashboardValueCard
                  name="DFT Burn Rate"
                  value="2.00"
                  endSymbol="%"
                />
              </Grid>
              <Grid item xs={12}>
                <DashboardValueCard
                  name="DFT Fee Rate"
                  value="0.50"
                  endSymbol="%"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <DashboardGraphCard />
          </Grid>
        </Grid>
      </Flex>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardPointsCard />
        </Grid>
      </Grid>
    </Box>
  )
}
