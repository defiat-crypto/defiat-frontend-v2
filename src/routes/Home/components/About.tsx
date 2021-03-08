import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import WhitepaperV2 from "assets/files/DFT-DeFiat-Whitepaper.pdf";
import { Display } from "components/Display/Display";
import { Header } from "components/Header";
import { DescriptionRounded, HelpOutlineRounded } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export const About = () => {
  const history = useHistory();

  return (
    <Display column center>
      <Header
        title="About"
        subtitle="DeFiat (DFT): Governed, Deflationary ERC-20"
        align="center"
      />
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Typography variant="body1" align="center" paragraph>
            <b>DeFiat (DFT)</b> is a fully-governed, deflationary ERC-20 token
            with a multi-tiered loyalty reward system. Every time DFT is
            transacted, an amount from the transaction is taken for fees and
            another amount is permanently burned; naturally reducing supply over
            time. Holders of DFT are granted proportional voting rights in
            network decisions, such as setting the burn and fee rates. DeFiat's
            AnyStake platform allows users to stake any ERC-20 token in the
            governance-chosen liquidity pools, making your money work for you.
            Users also gain loyalty points, in the form of DFTP, as they
            interact with the DeFiat ecosystem, resulting in lower fee and burn
            rates on DFT transactions.
          </Typography>
        </Grid>
      </Grid>

      <Flex justify="center">
        <Box mr={2}>
          <Button
            href={WhitepaperV2}
            startIcon={<DescriptionRounded />}
            color="primary"
            variant="contained"
          >
            Whitepaper
          </Button>
        </Box>
        <Button
          onClick={() => history.push("/faq")}
          startIcon={<HelpOutlineRounded />}
          variant="contained"
        >
          Learn More
        </Button>
      </Flex>
    </Display>
  );
};
