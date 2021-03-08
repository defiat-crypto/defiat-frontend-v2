import { Timeline } from "@material-ui/lab";
import { Flex } from "components/Flex";
import { Header } from "components/Header";
import { RoadmapItem } from "./RoadmapItem";

export const Roadmap = () => {
  return (
    <Flex column>
      <Header
        title="Roadmap"
        subtitle="Building a New Brand of Decentralized Finance"
        align="center"
      />
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
          date="Nov 2020"
          title="2ND Chance"
          text="Clean up the DeFi ecosystem by introducing 2ND Chance, the token designed to give your rugged tokens new life"
          releaseDate="2020.11.01"
        />
        <RoadmapItem
          date="Jan 2021"
          title="DeFiat: Reloaded"
          text="Update DeFiat.net with a complete UI overhaul, introducing a new dashboard, mobile support, and additional project documentation"
          releaseDate="2021.01.14"
          opposite
        />
        <RoadmapItem
          date="Feb 2021"
          title="AnyStake Testnet"
          text="Launched the AnyStake Testnet with supporting Regulator and Vault contracts. Stake any ERC-20 and earn DFT"
          releaseDate="2021.02.18"
        />
        <RoadmapItem
          date="Feb 2021"
          title="Points and Governance Upgrades"
          text="Upgraded DeFiat Points v2 (DFTPv2) and DeFiat's Governance contract with more robust features and improved functionalities"
          releaseDate="2021.02.28"
          opposite
        />
        <RoadmapItem
          date="Mar 2021"
          title="AnyStake"
          text="DeFiat's main DeFi service, AnyStake allows users to stake any ERC20 token and earn yield"
        />
        <RoadmapItem
          date="Mar 2021"
          title="DeFiX Burn Events"
          text="Periodically, community burn events will take place to increase deflationary pressure on DFT"
          opposite
        />
        <RoadmapItem
          date="Apr 2021 and On..."
          title="More Roadmap Items Coming Soon!"
          text="Additional staking pools, service upgrades, and more!"
        />
        <RoadmapItem />
      </Timeline>
    </Flex>
  );
};
