import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import { Card } from "components/Card";
import { StakingPool } from "constants/pools";

interface PoolCardProps {
  pool: StakingPool;
}

export const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  const { id, logo, name, symbol, address, decimals } = pool;

  const history = useHistory();
  const [poolApr, setPoolApr] = useState((0).toFixed(2));

  // const totalStaked = "1,000 " + stakedSymbol;

  const [isOpen, setOpen] = useState(false);
  function toggle() {
    setOpen(!isOpen);
    return;
  }

  return (
    <Card>
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
            <b>1,000.00</b>
          </Typography>
          <Typography variant="subtitle2" align="center">
            Total Staked
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" align="center">
            <b>100%</b>
          </Typography>
          <Typography variant="subtitle2" align="center">
            APR
          </Typography>
        </Box>
      </Flex>
      {/* {isPoolClosed && <h3 className="mb-1">Pool is Closed</h3>} */}
      {/* <Collapse isOpen={isOpen}>
            <div className="mt-2 mb-2">
              {!isPoolClosed && <DisplayRow title="Total Staked:" value={totalStaked} />}

              <DisplayRow title="Pool Opens:" value={poolOpen} />
              <DisplayRow title="Pool Closes:" value={poolClose} />

              <DisplayRow title="Entry Fee:" value={poolFee} />

              {!isPoolClosed && <DisplayRow title="APR:" value={poolApr + "%"} />}
            </div>
          </Collapse> */}
      <Button
        onClick={() => history.push(`/dashboard/staking/${id}`)}
        color="primary"
        variant="contained"
        fullWidth
        // disabled={!isPoolOpen || poolMetrics.rewards === 0}
      >
        Go To Pool
      </Button>
    </Card>
  );
};
