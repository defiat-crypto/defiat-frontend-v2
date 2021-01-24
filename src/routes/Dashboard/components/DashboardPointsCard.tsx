import { Chip, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Card } from "../../../components/Card";
import { Flex } from "../../../components/Flex";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useDashboard } from "../../../hooks/useDashboard";

export const DashboardPointsCard = () => {
  const {data} = useDashboard();

  return (
    <Card>
      <Flex align='center' justify='space-between' mb={2}>
        <Typography variant="h5">
          DeFiat Points
        </Typography>
        <Flex align='flex-end'>
          <Typography variant="h5">{data ? data.pointsBalance : '0'}</Typography>
          <Typography variant="h5" color="textSecondary">/{data ? data.nextLevel : '0'}</Typography>
          <Typography variant="body1">DFTP</Typography>
        </Flex>
      </Flex>
      

      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={1}>
          <Flex center>
            <Chip label={data ? data.discountLevel : '0'} color="primary" />
          </Flex>
        </Grid>

        <Grid item xs={10}>
          <LinearProgress variant="determinate" value={data ? +data.pointsBalance/+data.nextLevel : 0} color="primary" />
        </Grid>

        <Grid item xs={1}>
          <Flex center>
            <Chip label={data ? +data.discountLevel+1 : '0'} color="primary" />
          </Flex>
        </Grid>
      </Grid>
    </Card>
  );
};
