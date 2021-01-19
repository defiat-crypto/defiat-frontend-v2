import { Typography } from "@material-ui/core";
import { Timeline } from "@material-ui/lab";
import React from "react";
import { Flex } from "../../../../components/Flex";
import { RoadmapItem } from "./RoadmapItem";

export const Roadmap = () => {
  return (
    <Flex column>
      <Typography color="primary" variant="h4" align="center" gutterBottom>Roadmap</Typography>
      <Timeline align="alternate">
        <RoadmapItem
          date="Aug 2020"
          title="Token & dApp Release"
          text="Launch Token, Points, and Governance Contracts on Ethereum Mainnet alongside dApp"
          releaseDate="2020.08.28"
        />
        <RoadmapItem
          date="Sept 2020"
          title="Native DFT Staking Pools"
          text="Release time-based native staking pools for DFT, DFTP, and DFT-UNI-V2 tokens"
          releaseDate="2020.09.14"
          opposite
        />
        <RoadmapItem
          date="Oct 2020"
          title="DFT Voting Contracts"
          text="Begin decentralized governance protocol by launching voting contracts that work on the DFT network"
          releaseDate="2020.10.04"
        />
        <RoadmapItem
          date="Oct 2020"
          title="Partner Staking Pools"
          text="Release time-based staking pools for other partner ERC20 tokens, starting with XMM"
          releaseDate="2020.10.14"
          opposite
        />
        <RoadmapItem
          date="Oct/Nov 2020"
          title="2ND Chance"
          text="Clean up the DeFi ecosystem by introducing 2ND Chance, the token designed to give your rugged tokens new life"
          releaseDate="2020.11.01"
        />
        <RoadmapItem
          date="Nov 2020"
          title="Upgrade & Decentralize Governance Protocol"
          text="Launch the first governance protocol upgrade for DFT, aimed at reducing the mastermind's central control mechanisms"
          opposite
        />
        <RoadmapItem
          date="Nov/Dec 2020"
          title="AnyStake"
          text="DeFiat's main DeFi offering, AnyStake allows users to stake any ERC20 token and earn yield"
        />
        <RoadmapItem
          date="Dec 2020"
          title="DeFiX Burn Events"
          text="Periodically, community burn events will take place to increase deflationary pressure on DFT"
          opposite
        />
        <RoadmapItem
          date="Dec 2020 and On..."
          title="More Roadmap Items Coming Soon!"
          text="Additional staking pools, DFTP upgrades, website updates, rebranding, & more!"
        />
        <RoadmapItem />
      </Timeline>
    </Flex>
  );
};
