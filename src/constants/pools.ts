import tokenLogo from "assets/img/logo192.png";
import pointsLogo from "assets/img/points256.png";

export interface StakingPool {
  id: number;
  logo: string;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
}

export const Pools = {
  1: [
    {
      id: 0,
      logo: tokenLogo,
      name: "DeFiat Liquidity",
      symbol: "DFT/ETH LP",
      address: "",
      decimals: 18,
    },
    {
      id: 1,
      logo: pointsLogo,
      name: "DeFiat Points v2 Liquidity",
      symbol: "DFTPv2/ETH LP",
      address: "",
      decimals: 18,
    },
  ],
  4: [
    {
      id: 0,
      logo: tokenLogo,
      name: "DeFiat Liquidity",
      symbol: "DFT/ETH LP",
      address: "",
      decimals: 18,
    },
    {
      id: 1,
      logo: pointsLogo,
      name: "DeFiat Points v2 Liquidity",
      symbol: "DFTPv2/ETH LP",
      address: "",
      decimals: 18,
    },
    {
      id: 2,
      logo: pointsLogo,
      name: "8 Ball Token",
      symbol: "8BALL",
      address: "",
      decimals: 8,
    },
    {
      id: 3,
      logo: pointsLogo,
      name: "1% Fee Token",
      symbol: "1FEE",
      address: "",
      decimals: 18,
    },
  ],
};
