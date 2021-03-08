import { Grid, Toolbar } from "@material-ui/core";
import React from "react";
import { Flex } from "../../components/Flex";
import { Header } from "../../components/Header";
import { Web3ConnectView } from "../../components/Web3ConnectView";
import { useDashboard } from "../../hooks/useDashboard";
import { DashboardGraphCard } from "./components/DashboardGraphCard";
import { DashboardPointsCard } from "./components/DashboardPointsCard";
import { DashboardValueCard } from "./components/DashboardValueCard";

export const Dashboard = () => {
  const { data } = useDashboard();

  return (
    <Web3ConnectView>
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
              value={data ? data.tokenBalance : "0.00"}
              endSymbol="DFT"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DashboardValueCard
              name="DFT Price"
              value={data ? data.tokenPrice : "0.00"}
              startSymbol="$"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DashboardValueCard
              name="ETH Price"
              value={data ? data.ethPrice : "0.00"}
              startSymbol="$"
            />
          </Grid>
        </Grid>
      </Flex>
      <Flex mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} style={{ flex: "1" }}>
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <DashboardValueCard
                  name="DFT Total Supply"
                  value={data ? data.tokenSupply : "0.00"}
                  endSymbol="DFT"
                />
              </Grid>
              <Grid item xs={12}>
                <DashboardValueCard
                  name="DFT Burn Rate"
                  value={data ? data.burnRate : "0.00"}
                  endSymbol="%"
                />
              </Grid>
              <Grid item xs={12}>
                <DashboardValueCard
                  name="DFT Fee Rate"
                  value={data ? data.feeRate : "0.00"}
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
    </Web3ConnectView>
  );
};
