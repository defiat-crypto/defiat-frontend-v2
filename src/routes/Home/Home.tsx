import { Flex } from "../../components/Flex";
import { Splash } from "./components/Splash";
import { Ecosystem } from "./components/Ecosystem";
import { Roadmap } from "./components/Roadmap";
import { About } from "./components/About";
import { Team } from "./components/Team";
import { Community } from "./components/Community";
import { Tokenomics } from "./components/Tokenomics";

export const Home = () => {
  return (
    <Flex column>
      <Splash />
      <Ecosystem />
      <About />
      <Community />
      <Roadmap />
      <Tokenomics />
      <Team />
    </Flex>
  );
};
