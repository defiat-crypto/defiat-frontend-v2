import tokenLogo from "assets/img/logo192.png";
import pointsLogo from "assets/img/points256.png";
import eightLogo from "assets/img/8ball.png";
import feeLogo from "assets/img/1fee.png";
import linkLogo from "assets/img/link256.png";
import uniLogo from "assets/img/uni256.png";
import wethLogo from "assets/img/weth256.png";
import usdcLogo from "assets/img/usdc256.png";
import tokenLpLogo from "assets/img/defiatLp512.png";
import pointsLpLogo from "assets/img/pointsLp512.png";
import mkrLogo from "assets/img/maker256.png";
import wbtcLogo from "assets/img/wbtc256.png";
import farmLogo from "assets/img/harvest256.png";
import erowanLogo from "assets/img/erowan256.png";
import chartexLogo from "assets/img/chartex.png";
import coreLogo from "assets/img/cvault256.png";
import offshiftLogo from "assets/img/offshift256.png";
import sushiLogo from "assets/img/sushi256.png";
import qntLogo from "assets/img/quant256.png";
import grtLogo from "assets/img/grt256.png";
import zeroLogo from "assets/img/zero256.png";
import daiLogo from "assets/img/dai256.png";
import kineLogo from "assets/img/kine256.png";
import mirLogo from "assets/img/mirror256.png";
import cvtLogo from "assets/img/civitas256.png";
import ultraLogo from "assets/img/ultra256.png";

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
      address: "0xb4c36b752b706836ab90ed4e78b058150ae9ed59",
      decimals: 18,
    },
    {
      pid: 3,
      logo: usdcLogo,
      name: "USD Coin",
      symbol: "USDC",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      decimals: 6,
    },
    {
      pid: 4,
      logo: wbtcLogo,
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      decimals: 8,
    },
    {
      pid: 5,
      logo: wethLogo,
      name: "Wrapped Ethereum",
      symbol: "WETH",
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      decimals: 18,
    },
    {
      pid: 6,
      logo: uniLogo,
      name: "Uniswap",
      symbol: "UNI",
      address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      decimals: 18,
    },
    {
      pid: 7,
      logo: linkLogo,
      name: "Chainlink",
      symbol: "LINK",
      address: "0x514910771af9ca656af840dff83e8264ecf986ca",
      decimals: 18,
    },
    {
      pid: 8,
      logo: mkrLogo,
      name: "Maker",
      symbol: "MKR",
      address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
      decimals: 18,
    },
    {
      pid: 9,
      logo: sushiLogo,
      name: "Sushiswap",
      symbol: "SUSHI",
      address: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
      decimals: 18,
    },
    {
      pid: 10,
      logo: offshiftLogo,
      name: "Offshift",
      symbol: "XFT",
      address: "0xabe580e7ee158da464b51ee1a83ac0289622e6be",
      decimals: 18,
    },
    {
      pid: 11,
      logo: chartexLogo,
      name: "ChartEx",
      symbol: "CHART",
      address: "0x1d37986f252d0e349522ea6c3b98cb935495e63e",
      decimals: 18,
    },
    {
      pid: 12,
      logo: qntLogo,
      name: "Quant Network",
      symbol: "QNT",
      address: "0x4a220e6096b25eadb88358cb44068a3248254675",
      decimals: 18,
    },
    {
      pid: 13,
      logo: erowanLogo,
      name: "Sifchain",
      symbol: "EROWAN",
      address: "0x07bac35846e5ed502aa91adf6a9e7aa210f2dcbe",
      decimals: 18,
    },
    {
      pid: 14,
      logo: grtLogo,
      name: "The Graph",
      symbol: "GRT",
      address: "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
      decimals: 18,
    },
    {
      pid: 15,
      logo: mirLogo,
      name: "Mirror Protocol",
      symbol: "MIR",
      address: "0x09a3ecafa817268f77be1283176b946c4ff2e608",
      decimals: 18,
    },
    {
      pid: 16,
      logo: farmLogo,
      name: "Harvest Finance",
      symbol: "FARM",
      address: "0xa0246c9032bC3A600820415aE600c6388619A14D",
      decimals: 18,
    },
    {
      pid: 17,
      logo: kineLogo,
      name: "KINE Protocol",
      symbol: "KINE",
      address: "0xcbfef8fdd706cde6f208460f2bf39aa9c785f05d",
      decimals: 18,
    },
    {
      pid: 18,
      logo: zeroLogo,
      name: "Zero Exchange",
      symbol: "ZERO",
      address: "0xf0939011a9bb95c3b791f0cb546377ed2693a574",
      decimals: 18,
    },
    {
      pid: 19,
      logo: daiLogo,
      name: "DAI Stablecoin",
      symbol: "DAI",
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      decimals: 18,
    },
    {
      pid: 20,
      logo: coreLogo,
      name: "cVault Finance",
      symbol: "CORE",
      address: "0x62359ed7505efc61ff1d56fef82158ccaffa23d7",
      decimals: 18,
    },
    {
      pid: 21,
      logo: ultraLogo,
      name: "Ultra",
      symbol: "UOS",
      address: "0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c",
      decimals: 4,
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
    {
      pid: 5,
      logo: cvtLogo,
      name: "Civitas",
      symbol: "CVT",
      address: "0x88930072F583936F506CE1f1d5Fe69290C2D6A2a",
      decimals: 18,
    },
  ],
};
