import { Button, Grid, Typography } from "@material-ui/core";
import { UpdateRounded } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { Display } from "components/Display";
import { Flex } from "components/Flex";
import { Header } from "components/Header";
import { SocialMediaButtons } from "components/SocialMediaButtons";
import { TrackingButtons } from "./TrackingButtons";

export const Community = () => {
  const history = useHistory();

  return (
    <Display column center>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Flex column align="center">
            <Flex column center pb={2}>
              <Typography variant="h5" align="center">
                Official DeFiat Community
              </Typography>
              <SocialMediaButtons />
            </Flex>

            <Typography variant="h5" align="center">
              DeFiat Token Tracking
            </Typography>
            <TrackingButtons />
          </Flex>
        </Grid>
        <Grid item xs={12} md={6}>
          <Header
            title="Community"
            subtitle="Get Connected with DeFi"
            align="left"
          />
          <Typography variant="body1" paragraph>
            Stay updated on the latest news, information, and developments about
            DeFiat and other Decentralized Finance networks. Follow us on your
            favorite platform and join the DeFiat Community today!
          </Typography>
          <Button
            onClick={() => history.push("/news")}
            startIcon={<UpdateRounded />}
            color="primary"
            variant="contained"
          >
            View Latest Updates
          </Button>
        </Grid>
      </Grid>
    </Display>
  );
};
