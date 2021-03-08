import { Grid } from "@material-ui/core";
import { SummaryCard } from "components/SummaryCard";
import logo192 from "assets/img/logo192.png";
import React from "react";
import { useWallet } from "use-wallet";
import { useParams } from "react-router";
import { Pools } from "constants/pools";
import { usePoolCard } from "hooks/usePoolCard";
import { usePool } from "hooks/usePool";

export const PoolSummary = () => {
  const { chainId } = useWallet();
  const { pid } = useParams<{ pid: string }>();
  const { logo, name, symbol, address } = Pools[chainId][pid];

  const { data } = usePool(+pid);

  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <SummaryCard
          id="balance"
          header={data ? `${data.totalStaked} ${symbol}` : `0.00 ${symbol}`}
          title="Total Tokens Staked"
          color="info"
          tooltip="The total amount of DFT in your connected ERC20 wallet."
          icon={logo}
        />
      </Grid>
      <Grid item md={4}>
        <SummaryCard
          id="claimableRewards"
          header={`$${data ? data.totalValueStaked : "0.00"}`}
          title="Total Value Staked"
          color="info"
          tooltip="The total amount of DFT in your connected ERC20 wallet."
          icon={logo192}
        />
      </Grid>
      <Grid item md={4}>
        <SummaryCard
          id="tokenPrice"
          header={data ? `$${data.tokenPrice}` : `$0.00`}
          title={`${symbol} Price`}
          color="info"
          tooltip="The total amount of DFT in your connected ERC20 wallet."
          icon={logo192}
        />
      </Grid>
    </Grid>
  );
};
