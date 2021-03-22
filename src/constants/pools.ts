import tokenLogo from "assets/img/logo192.png";
import pointsLogo from "assets/img/points256.png";
import eightLogo from "assets/img/8ball.png";
import feeLogo from "assets/img/1fee.png";
import linkLogo from "assets/img/link256.png";
import uniLogo from "assets/img/uni256.png";
import usdtLogo from "assets/img/usdt256.png";
import usdcLogo from "assets/img/usdc256.png";
import tokenLpLogo from "assets/img/defiatLp512.png";
import pointsLpLogo from "assets/img/pointsLp512.png";

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
      name: "DeFiat",
      symbol: "DFT",
      address: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
      decimals: 18,
    },
    {
      pid: 1,
      logo: tokenLpLogo,
      name: "DeFiat Liquidity",
      symbol: "DFT/ETH LP",
      address: "0xe2a1d215d03d7e9fa0ed66355c86678561e4940a",
      decimals: 18,
    },
    {
      pid: 2,
      logo: pointsLpLogo,
      name: "DeFiat Points v2 Liquidity",
      symbol: "DFTPv2/ETH LP",
      address: "0xde3e18ecb613498b9a1483af51394ec2259bcd0a",
      decimals: 18,
    },
    {
      pid: 3,
      logo: usdcLogo,
      name: "USD Coin",
      symbol: "USDC",
      address: "0xD5D087d31dDcc58c70d0441554dff9C9874c882F",
      decimals: 6,
    },
    {
      pid: 4,
      logo: usdtLogo,
      name: "Tether",
      symbol: "USDT",
      address: "0x549D392c89ee87C35A75808208b0C8F383AD8B01",
      decimals: 6,
    },
    {
      pid: 5,
      logo: uniLogo,
      name: "Uniswap",
      symbol: "UNI",
      address: "0xD5D087d31dDcc58c70d0441554dff9C9874c882F",
      decimals: 8,
    },
    {
      pid: 6,
      logo: linkLogo,
      name: "Chainlink",
      symbol: "LINK",
      address: "0x549D392c89ee87C35A75808208b0C8F383AD8B01",
      decimals: 18,
    },
  ],
  4: [
    {
      pid: 0,
      logo: tokenLogo,
      name: "DeFiat",
      symbol: "DFT",
      address: "0xB571d40e4A7087C1B73ce6a3f29EaDfCA022C5B2",
      decimals: 18,
    },
    {
      pid: 1,
      logo: tokenLpLogo,
      name: "DeFiat Liquidity",
      symbol: "DFT/ETH LP",
      address: "0xF7426EAcb2b00398D4cefb3E24115c91821d6fB0",
      decimals: 18,
    },
    {
      pid: 2,
      logo: pointsLpLogo,
      name: "DeFiat Points v2 Liquidity",
      symbol: "DFTPv2/ETH LP",
      address: "0x23A4c03d18666970200A202116Aa8752fbB5a2FB",
      decimals: 18,
    },
    {
      pid: 3,
      logo: eightLogo,
      name: "8 Ball Token",
      symbol: "8BALL",
      address: "0xD5D087d31dDcc58c70d0441554dff9C9874c882F",
      decimals: 8,
    },
    {
      pid: 4,
      logo: feeLogo,
      name: "1% Fee Token",
      symbol: "1FEE",
      address: "0x549D392c89ee87C35A75808208b0C8F383AD8B01",
      decimals: 18,
    },
  ],
};
