import React from "react";
import { useHistory } from "react-router-dom";
import vault256 from "assets/img/vault256.png";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import { Card } from "components/Card";
import { StakingPool } from "constants/pools";
import { usePoolCard } from "hooks/usePoolCard";

interface StakingPoolCardProps {
  pool: StakingPool;
}

const useStyles = makeStyles((theme) => ({
  image: {
    height: "50px",
    width: "auto",
    position: "absolute"
  },
}));

export const StakingPoolCard: React.FC<StakingPoolCardProps> = ({ pool }) => {
  const history = useHistory();
  const { pid, logo, name, symbol, address, decimals } = pool;
  const { data } = usePoolCard(pid);

  const classes = useStyles();
  return (
    <Card>
      {data?.vipAmount.isGreaterThan(0) ?
        <img src={vault256} alt="VIP" className={classes.image} />
        : ""}
      <Flex align="center" justify="center">
        <img src={logo} alt={symbol} height="100px" width="auto" />
      </Flex>

      <Box>
        <Typography variant="h4" align="center">
          <b>{symbol}</b>
        </Typography>
        <Typography variant="subtitle2" align="center">
          {name}
        </Typography>
      </Box>

      <Flex justify="space-around" my={2}>
        <Box>
          <Typography variant="h5" align="center">
            <b>{data ? data.totalStaked : "0.00"}</b>
          </Typography>
          <Typography variant="subtitle2" align="center">
            Total Staked
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" align="center">
            <b>{data ? `${data.apr}%` : "0%"}</b>
          </Typography>
          <Typography variant="subtitle2" align="center">
            APR
          </Typography>
        </Box>
      </Flex>
      <Button
        onClick={() => history.push(`/staking/${pid}`)}
        color="primary"
        variant="contained"
        fullWidth
      >
        Go To Pool
      </Button>
    </Card>
  );
};
