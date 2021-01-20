import { Box, Grid, Toolbar } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../components/Flex'
import { Header } from '../../components/Header'
import { DashboardValueCard } from './components/DashboardValueCard'

export const Dashboard = () => {
  return (
    <Box>
      <Toolbar />
      <Flex center>
        <Header
          title="Dashboard"
          subtitle=""
          align="center"
        />
      </Flex>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardValueCard
            name="DFT Balance"
            value="1000"
            endSymbol="DFT"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardValueCard
            name="DFT Total Supply"
            value="490000"
            endSymbol="DFT"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardValueCard
            name="DFT Price"
            value="1"
            startSymbol="$"
          />
        </Grid>
      </Grid>
    </Box>
  )
}
