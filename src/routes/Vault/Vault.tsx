import { Display } from "components/Display";
import vault256 from "assets/img/vault256.png";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { SocialMediaButtons } from "components/SocialMediaButtons";
import { isTestnet } from "utils";
import { Flex } from "components/Flex";
import { VaultSummary } from "./components/VaultSummary";

const useStyles = makeStyles((theme) => ({
  image: {
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "130px",
    },
    [theme.breakpoints.up("md")]: {
      width: "130px",
    },
  },
}));

export const Vault = () => {
  const classes = useStyles();

  return (
    <Display column offset={isTestnet()} center={!isTestnet()}>
      {isTestnet() ? (
        <Box>
          <Flex center>
            <img
              src={vault256}
              className={classes.image}
              alt="anystake-brand"
            />
          </Flex>
          <Box my={2}>
            <VaultSummary />
          </Box>
        </Box>
      ) : (
        <Box>
          <Flex center>
            <img src={vault256} className={classes.image} alt="vault-brand" />
          </Flex>
          <Typography variant="h4" color="primary" align="center">
            Coming Soon
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" align="center">
            The future of DeFi ERC20 Staking will be here soon. Join our
            communities for more news and developments.
          </Typography>
          <SocialMediaButtons center />
        </Box>
      )}
    </Display>
  );
};
