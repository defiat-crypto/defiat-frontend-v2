import { Box, Grid } from "@material-ui/core";
import { EcosystemDisplay } from "./EcosystemDisplay";
import logo512 from "assets/img/logo512.png";
import governance256 from "assets/img/governance256.png";
import points256 from "assets/img/points256.png";
import services256 from "assets/img/services256.png";
import { Display } from "components/Display/Display";
import { Header } from "components/Header";

export const Ecosystem = () => {
  return (
    <Box>
      <Display column center>
        <Header
          title="DeFiat Ecosystem"
          subtitle="Extendable Platform for building DeFi Services"
          align="center"
        />
        <Grid container spacing={3}>
          <Grid item md={6} lg={3}>
            <EcosystemDisplay
              image={logo512}
              title="Token"
              text="Strictly Deflationary, ERC-20 Token (DFT) that powers the network, enabling holders to participate in governance decisions and access DeFiat Services."
            />
          </Grid>
          <Grid item md={6} lg={3}>
            <EcosystemDisplay
              image={governance256}
              title="Governance"
              text="Fully-Embedded Governance model which allows DFT token holders to regulate Token Burn, Fee Rates, Staking Rewards, and more."
            />
          </Grid>
          <Grid item md={6} lg={3}>
            <EcosystemDisplay
              image={points256}
              title="Points"
              text="Secondary, inflationary asset (DFTP) earned on network transactions. Rewards a discount on DFT transaction fee and burn rates, incentivizing token usage."
            />
          </Grid>
          <Grid item md={6} lg={3}>
            <EcosystemDisplay
              image={services256}
              title="Services"
              text="Collection of DeFi services powered by the DeFiat Token where participants are rewarded from the DeFiat Treasury."
            />
          </Grid>
        </Grid>
      </Display>
    </Box>
  );
};
