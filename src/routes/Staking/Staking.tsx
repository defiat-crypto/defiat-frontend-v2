import { Display } from "components/Display";
import anystakeBrand from "assets/img/anystakeBrand.png";
import { Box, makeStyles } from "@material-ui/core";
import { Flex } from "components/Flex";
import { StakingSummary } from "./components/StakingSummary";
import { StakingPoolList } from "./components/StakingPoolList";
import { Web3ConnectView } from "components/Web3ConnectView";

const useStyles = makeStyles((theme) => ({
  image: {
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "192px",
    },
    [theme.breakpoints.up("md")]: {
      width: "432px",
    },
  },
}));

export const Staking = () => {
  const classes = useStyles();

  return (
    <Web3ConnectView>
      <Display column offset>
        <Box>
          <Flex center>
            <img
              src={anystakeBrand}
              className={classes.image}
              alt="anystake-brand"
            />
          </Flex>
          <StakingSummary />
          <StakingPoolList />
        </Box>
        {/* <Box>
          <Flex center>
            <img
              src={anystakeBrand}
              className={classes.image}
              alt="anystake-brand"
            />
          </Flex>
          <Typography variant="h4" color="primary" align="center">
            Coming Soon
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" align="center">
            The future of DeFi ERC20 Staking will be here soon. Join our
            communities for more news and developments.
          </Typography>
          <SocialMediaButtons center />
        </Box> */}
      </Display>
    </Web3ConnectView>
  );
};
