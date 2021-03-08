import { Flex } from "components/Flex";
import { ImageButton } from "./ImageButton";
import etherscan from "assets/img/etherscan.png";
import uniswap from "assets/img/uniswap.png";
import gecko from "assets/img/gecko.png";
import chartex from "assets/img/chartex.png";
import Links from "constants/links";

export const TrackingButtons = () => {
  return (
    <Flex mt={1}>
      <ImageButton name="CoinGecko" href={Links.gecko} image={gecko} />
      <ImageButton name="Etherscan" href={Links.etherscan} image={etherscan} />
      <ImageButton name="Uniswap" href={Links.uniswap} image={uniswap} />
      <ImageButton name="ChartEx" href={Links.chartex} image={chartex} />
    </Flex>
  );
};
