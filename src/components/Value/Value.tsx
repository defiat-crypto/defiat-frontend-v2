import { Typography } from "@material-ui/core";
import React from "react";
import { Flex } from "../Flex";
import { TextDecoration } from "../TextDecoration";

interface ValueProps {
  value: string;
  name: string;
  startSymbol?: string;
  endSymbol?: string;
}

export const Value: React.FC<ValueProps> = ({
  value,
  name,
  startSymbol,
  endSymbol,
}) => {
  return (
    <Flex column center p={2}>
      <Flex align="flex-end">
        {startSymbol && (
          <Typography variant="body1">&nbsp;{startSymbol}</Typography>
        )}
        <Typography variant="h5">
          <b>{value}</b>
        </Typography>
        {endSymbol && (
          <Typography variant="body1">&nbsp;{endSymbol}</Typography>
        )}
      </Flex>

      <TextDecoration width="50%" />
      <Typography variant="subtitle2" color="textSecondary">
        {name}
      </Typography>
    </Flex>
  );
};
