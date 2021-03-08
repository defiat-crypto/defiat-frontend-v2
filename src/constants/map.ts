import Links from "./links";

const SiteMap = {
  routes: [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "FAQ",
      path: "/faq",
    },
    {
      name: "News",
      path: "/news",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    // {
    //   name: 'Staking',
    //   path: '/staking'
    // },
  ],
  services: [
    {
      name: "AnyStake",
      path: "/staking",
    },
    {
      name: "2ND Chance",
      path: "/second",
    },
  ],
  external: [
    {
      name: "Trade DFT",
      href: Links.uniswap,
    },
    {
      name: "Chart DFT",
      href: Links.chartex,
    },
  ],
  footer: [
    // {
    //   name: 'Whitepaper',
    //   path: '/whitepaper'
    // },
    {
      name: "Legal",
      path: "/legal",
    },
  ],
};

export default SiteMap;
