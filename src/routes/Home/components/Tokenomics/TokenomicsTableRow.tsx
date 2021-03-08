import { TableCell, TableRow } from "@material-ui/core";
import React from "react";

interface TokenomicsTableRowProps {
  i: string;
  description: string;
  supply: string;
  amount: string;
}

export const TokenomicsTableRow: React.FC<TokenomicsTableRowProps> = ({
  i,
  description,
  supply,
  amount,
}) => {
  return (
    <TableRow>
      <TableCell align="center">{i}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell align="right">{supply}</TableCell>
      <TableCell align="right">{amount}</TableCell>
    </TableRow>
  );
};
