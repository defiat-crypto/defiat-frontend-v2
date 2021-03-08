import { Box, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Flex } from "../../components/Flex";
import { Header } from "../../components/Header";
import { FAQCard } from "./components/FAQCard";
import logo192 from "../../assets/img/logo192.png";
import points256 from "../../assets/img/points256.png";
import governance256 from "../../assets/img/governance256.png";
import second256 from "../../assets/img/second256.png";

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
            startImage={logo192}
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
            endImage={points256}
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
            startImage={governance256}
          />
        </Grid>
        <Grid item>
          <FAQCard
            question="What are DeFiat Services?"
            answer="DeFiat Services are Decentralized Apps built on top of the DeFiat network. 
              The core services that DeFiat aims to provide are Staking, 2nd Chance, and AnyStake.
              Each of these services use the elements of the DeFiat Ecosystem in a unique way to participate
              in the overall DeFi ecosystem."
          />
        </Grid>
        <Grid item>
          <FAQCard
            question="What is AnyStake?"
            answer="AnyStake, initially started as Unified-Staking Protocol, is a DeFiat Service that
              allows members of the DFT ecosystem to stake any ERC-20 token and be rewarded with yield
              in the form of DFT. AnyStake is currently under development by the DeFiat Team and about to enter the testnet phase."
          />
        </Grid>
        <Grid item>
          <FAQCard
            question="What is 2nd Chance (2ND)?"
            answer="2nd Chance is a DeFiat Service that works to clean up the DeFi ecosystem! Users can deposit their tokens
              from projects that have rugged on their users to be rewarded with 2ND ERC-20 tokens. 2ND maintains a dynamic
              transaction fee and burn to maintain its price. Users who provide liquidity to 2ND can farm these transaction
              fees in a staking pool, the Rug Sanctuary."
            endImage={second256}
          />
        </Grid>
        <Grid item>
          <FAQCard
            question="Have there been any contract audits?"
            answer="Yes, we conducted an audit through services provided by Hacken Group. After completing their initial review,
              the team then resolved all issues before deploying the DeFiat Smart Contracts to the Ethereum Mainnet."
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
        <Typography variant="body1" align="center" color="textSecondary">
          Please reach out to us through any of our communities if you have any
          additional questions!
        </Typography>
      </Flex>
    </Box>
  );
};
