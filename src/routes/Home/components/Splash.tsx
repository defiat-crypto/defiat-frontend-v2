import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Display } from "components/Display";
import { Flex } from "components/Flex";
import logo512 from "assets/img/logo512.png";
import { SocialMediaButtons } from "components/SocialMediaButtons";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: theme.palette.primary.light,
  },
  image: {
    [theme.breakpoints.up("md")]: {
      height: "320px",
      width: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      height: "160px",
      width: "auto",
    },
  },
}));

export const Splash = () => {
  const classes = useStyles();

  return (
    <Display center>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h2" color="primary">
            <b>DeFiat</b>
          </Typography>
          <Typography variant="h5" className={classes.subtitle} gutterBottom>
            <b>A New Brand of Decentralized Finance</b>
          </Typography>
          <Typography variant="body2" gutterBottom>
            Finance used to be controlled by large institutions. Not anymore.
            Decentralized technology has taken the ledger public and yields are
            higher than ever before. Join the revolution and start your own
            financial liberation today.
          </Typography>
          <SocialMediaButtons />
        </Grid>
        <Grid item xs={12} md={4}>
          <Flex center>
            <img src={logo512} className={classes.image} alt="defiat" />
          </Flex>
        </Grid>
      </Grid>
    </Display>
  );
};
