import tokenLogo from "assets/img/logo192.png";
import pointsLogo from "assets/img/points256.png";
import eightLogo from "assets/img/8ball.png";
import feeLogo from "assets/img/1fee.png";

export interface StakingPool {
  pid: number;
  logo: string;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
}

export const Pools = {
  1: [
    {
      pid: 0,
      logo: tokenLogo,
      name: "DeFiat Liquidity",
      symbol: "DFT/ETH LP",
      address: "0xe2a1d215d03d7e9fa0ed66355c86678561e4940a",
      decimals: 18,
    },
    {
      pid: 1,
      logo: pointsLogo,
      name: "DeFiat Points v2 Liquidity",
      symbol: "DFTPv2/ETH LP",
      address: "0xde3e18ecb613498b9a1483af51394ec2259bcd0a",
      decimals: 18,
    },
  ],
  4: [
    {
      pid: 0,
      logo: tokenLogo,
      name: "DeFiat Liquidity",
      symbol: "DFT/ETH LP",
      address: "0xF7426EAcb2b00398D4cefb3E24115c91821d6fB0",
      decimals: 18,
    },
    {
      pid: 1,
      logo: pointsLogo,
      name: "DeFiat Points v2 Liquidity",
      symbol: "DFTPv2/ETH LP",
      address: "0xCEBF1e6b266DCE1a32ac57Ee4C0e3100d3198e56",
      decimals: 18,
    },
    {
      pid: 2,
      logo: eightLogo,
      name: "8 Ball Token",
      symbol: "8BALL",
      address: "0xD5D087d31dDcc58c70d0441554dff9C9874c882F",
      decimals: 8,
    },
    {
      pid: 3,
      logo: feeLogo,
      name: "1% Fee Token",
      symbol: "1FEE",
      address: "0x549D392c89ee87C35A75808208b0C8F383AD8B01",
      decimals: 18,
    },
  ],
};
