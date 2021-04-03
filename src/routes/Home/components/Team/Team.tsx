import { Grid, Typography } from "@material-ui/core";
import { Display } from "components/Display";
import { Flex } from "components/Flex";
import { Header } from "components/Header";
import { TeamCard } from "./TeamCard";

export const Team = () => {
  return (
    <Display column center>
      <Header
        title="Team"
        subtitle="DeFiat Network Masterminds"
        align="center"
      />
      <Flex mb={3}>
        <Grid container justify="center">
          <Grid item md={10}>
            <Typography variant="body1" align="center" paragraph>
              The DeFiat team has over 40 years of industry experience and is
              comprised of some of the brightest minds in blockchain. Since
              members from our team are actively employed in the industry, the
              team has chosen to stay anonymous due to potential conflicts of
              interest. Please feel free to reach out to the team through
              Discord or email.
            </Typography>
          </Grid>
        </Grid>
      </Flex>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <TeamCard
            name="Steven"
            title="Blockchain Developer"
            email="steven@defiat.net"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TeamCard
            name="QuantSoldier"
            title="dApp Developer"
            email="quantsoldier@defiat.net"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TeamCard
            name="Mandalf"
            title="Designer"
            email="mandalf@defiat.net"
          />
        </Grid>
      </Grid>
    </Display>
  );
};
