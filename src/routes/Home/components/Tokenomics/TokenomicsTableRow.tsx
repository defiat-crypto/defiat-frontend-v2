import { TableCell, TableRow } from '@material-ui/core'
import React from 'react'

interface TokenomicsTableRowProps {
  i: number
  description: string
  supply: string
  amount: string
}

export const TokenomicsTableRow: React.FC<TokenomicsTableRowProps> = ({
  i,
  description,
  supply,
  amount
}) => {
  return (
    <TableRow>
      <TableCell>{i}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{supply}</TableCell>
      <TableCell>{amount}</TableCell>
    </TableRow>
  )
}
