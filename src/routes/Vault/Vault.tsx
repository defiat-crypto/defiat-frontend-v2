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
    <Display column>
      <Box>
        <Flex center>
          <img
            src={vault256}
            className={classes.image}
            alt="Vault"
          />
        </Flex>
        <Box my={2}>
          <VaultSummary />
        </Box>
      </Box>

    </Display>
  );
};
