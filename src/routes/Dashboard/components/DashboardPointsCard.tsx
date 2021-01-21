import { Chip, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Card } from "../../../components/Card";
import { Flex } from "../../../components/Flex";
import LinearProgress from "@material-ui/core/LinearProgress";

export const DashboardPointsCard = () => {
  return (
    <Card>
      <Flex align='center' justify='space-between' mb={2}>
        <Typography variant="h5">
          DeFiat Points
        </Typography>
        <Flex align='flex-end'>
          <Typography variant="h5">55</Typography>
          <Typography variant="h5" color="textSecondary">/100</Typography>
          <Typography variant="body1">DFTP</Typography>
        </Flex>
      </Flex>
      

      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={1}>
          <Flex center>
            <Chip label="2" color="primary" />
          </Flex>
        </Grid>

        <Grid item xs={10}>
          <LinearProgress variant="determinate" value={60} color="primary" />
        </Grid>

        <Grid item xs={1}>
          <Flex center>
            <Chip label="3" color="primary" />
          </Flex>
        </Grid>
      </Grid>
    </Card>
  );
};
