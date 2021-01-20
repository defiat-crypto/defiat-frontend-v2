import { Box, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Flex } from "../../components/Flex";
import { Header } from "../../components/Header";
import { FAQCard } from "./components/FAQCard";

export const FAQ = () => {
  return (
    <Box>
      <Toolbar />
      <Box mt={2}>
        <Header
          title="FAQ"
          subtitle="Frequently Asked Questions"
          align="center"
        />
      </Box>

      <Grid container spacing={3} direction="column">
        <Grid item>
          <FAQCard
            question="What is DeFiat?"
            answer="DeFiat is a new approach to Decentralized Finance, commonly known as DeFi, by offering 
              non-custodial, decentralized financial services that are powered by DeFiat (DFT) Tokens.
              DeFiat's unique smart contract ecosystem creates economic incentives to hold and stake the token,
              while providing an extendable platform to build DeFi services on top of.
              Deflationary features of the DFT token work to reward token stakers through transaction fees and burns,
              creating a sustainable economic model. DeFiat includes fully embedded governance, where the token holders
              are granted voting power to decide on the direction of the platform based on their network share."
          />
        </Grid>
        <Grid item>
          <FAQCard
            question="What is the DeFiat Token (DFT)?"
            answer="DFT is the native token which fuels the DeFiat ecosystem. Anyone who holds the token is
              granted proportional ownership of the platform and has the right to vote accordingly within the
              governance of the platform. Holders can earn yield by staking the token in one of the
              pools offered through DeFiat Services."
          />
        </Grid>
        <Grid item>
          <FAQCard
            question="What are DeFiat Points (DFTP)?"
            answer="DFT-P is the secondary token of the DeFiat ecosystem. One can earn DFT-P by transacting DFT
            on the open market, voting within the governance of the platform or by staking DFT in the
            staking pool; Points Palace. DFT-P benefits users by giving discount levels at certain thresholds
            of interaction. Users can achieve discounts rate on future transactions and burn fee's."
          />
        </Grid>
        <Grid item>
          <FAQCard
            question="What is DeFiat Governance?"
            answer="Governance can be seen as a democratic way to decide in which direction the platform should
          be heading. DeFiat Governance aims to create a community-based DeFi ecosystem where role's
          are voted on and empowered through economic incentives. The outcome of these decisions are
          all in the hands of the community."
          />
        </Grid>
        <Grid item>
          <FAQCard
            question="What are the three levels of DeFiat's Governance?"
            answer="To decide the direction of the platform just as in any governance in the real world it needs
          leaders. These leaders are chosen by the people, which in our case are the users of the
          platform. These leaders can also be voted out for again, so no monopoly can ever be created.
          DeFiat believes strongly in the strength of the users voting power."
          />
        </Grid>
        <Grid item>
          <FAQCard question="What are DeFiat Services?" answer="" />
        </Grid>
        <Grid item>
          <FAQCard
            question="What is AnyStake?"
            answer="Anystake or initially started as Unified-Staking Protocol allows members of the DFT ecosystem
        to stake any ERC-20 token and be rewarded with yield in the form of DFT."
          />
        </Grid>
        <Grid item>
          <FAQCard question="What is 2nd Chance (2ND)?" answer="" />
        </Grid>
        <Grid item>
          <FAQCard
            question="Have there been any contract audits?"
            answer="Yes, we let Hacken Group audit the DeFiat smart contract and conducted final retouches of the
          smart contract where it was needed. The final outcome of the audit can be found here."
          />
        </Grid>
        <Grid item>
          <FAQCard
            question="Are team tokens locked?"
            answer="Yes the granted tokens for the team have been locked and have a vesting period of ten months
          which release 10% each month. Furthermore, there is a permanent lock of liquidity upon the
          listing on Uniswap."
          />
        </Grid>
      </Grid>
      <Flex mt={3} center>
        <Typography variant="body1" align='center' color="textSecondary">
          Please reach out to us through any of our communities if you have any additional questions!
        </Typography>
      </Flex>
    </Box>
  );
};
