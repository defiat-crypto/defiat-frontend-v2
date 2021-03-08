import { Grid, Table, TableBody, TableHead } from "@material-ui/core";
import React from "react";
import { Display } from "components/Display";
import { Flex } from "components/Flex";
import { Header } from "components/Header";
import { TokenomicsGraph } from "./TokenomicsGraph";
import { TokenomicsTableRow } from "./TokenomicsTableRow";

export const Tokenomics = () => {
  return (
    <Display column center>
      <Header
        title="Tokenomics"
        subtitle="Distributed to promote Long-Term Growth & Sustainability"
        align="center"
      />
      <Grid container spacing={3} alignItems="center" justify="center">
        <Grid item xs={12} md={5}>
          <Flex center>
            <TokenomicsGraph />
          </Flex>
        </Grid>
        <Grid item xs={12} md={5}>
          <Table>
            <TableHead>
              <TokenomicsTableRow
                i="#"
                description="Description"
                supply="Supply"
                amount="Token Allocation"
              />
            </TableHead>
            <TableBody>
              <TokenomicsTableRow
                i="1"
                description="Team"
                supply="5%"
                amount="25K"
              />
              <TokenomicsTableRow
                i="2"
                description="Marketing"
                supply="10%"
                amount="50K"
              />
              <TokenomicsTableRow
                i="3"
                description="Development & Ops"
                supply="10%"
                amount="50K"
              />
              <TokenomicsTableRow
                i="4"
                description="Treasury - Staking Rewards"
                supply="10%"
                amount="50K"
              />
              <TokenomicsTableRow
                i="5"
                description="Treasury - Locked Liquidity"
                supply="15%"
                amount="75K"
              />
              <TokenomicsTableRow
                i="6"
                description="Initial Circulating"
                supply="50%"
                amount="250K"
              />
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Display>
  );
};
