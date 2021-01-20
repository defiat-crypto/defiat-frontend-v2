import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { Display } from '../../../../components/Display'
import { Header } from '../../../../components/Header'
import { TokenomicsTableRow } from './TokenomicsTableRow'

export const Tokenomics = () => {
  return (
    <Display column center>
      <Header
        title="Tokenomics"
        subtitle="Distributed to promote Long-Term Growth & Sustainability"
        align="center"
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>

        </Grid>
        <Grid item xs={12} md={6}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Supply</TableCell>
                <TableCell>Token Allocation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TokenomicsTableRow
                i={1}
                description="Team"
                supply="5%"
                amount="25K"
              />
              <TokenomicsTableRow
                i={2}
                description="Marketing"
                supply="10%"
                amount="50K"
              />
              <TokenomicsTableRow
                i={3}
                description="Development & Ops"
                supply="10%"
                amount="50K"
              />
              <TokenomicsTableRow
                i={4}
                description="Treasury - Staking Rewards"
                supply="10%"
                amount="50K"
              />
              <TokenomicsTableRow
                i={5}
                description="Treasury - Locked Liquidity"
                supply="15%"
                amount="75K"
              />
              <TokenomicsTableRow
                i={6}
                description="Initial Circulating"
                supply="50%"
                amount="250K"
              />
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Display>
  )
}
