import { Box, makeStyles, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import { Card } from "../Card";
import { Flex } from "..//Flex";
import { TextDecoration } from "../TextDecoration";

interface ValueCardProps {
  value: string;
  name: string;
  startSymbol?: string;
  endSymbol?: string;
  icon: string;
  tooltip?: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    // width: 'auto',
    [theme.breakpoints.up("md")]: {
      height: "128px",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export const ValueCard: React.FC<ValueCardProps> = ({
  value,
  name,
  startSymbol,
  endSymbol,
  icon,
  tooltip
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Tooltip title={tooltip ?? ""} placement="top-end">
        <Box>
          <Flex column justify="space-between">
            <Flex align="center">
              <Box mr={2}>
                <img src={icon} height="36px" width="auto" alt={name} />
              </Box>
              <Flex align="flex-end">
                {!!startSymbol && (
                  <Typography variant="body1">{startSymbol}</Typography>
                )}
                <Typography variant="h5">{value}</Typography>
                {!!endSymbol && (
                  <Typography variant="body1">{endSymbol}</Typography>
                )}
              </Flex>
            </Flex>
            <TextDecoration width="100%" />
            <Typography variant="body2" color="textSecondary" align="left">
              {name}
            </Typography>
          </Flex>
        </Box>
      </Tooltip>
    </Card >
  );
};
