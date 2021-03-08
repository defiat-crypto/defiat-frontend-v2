export const formatAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const getEtherscanAddress = (chainId: number, address: string) => {
  return chainId === 1
    ? `https://etherscan.io/address/${address}`
    : `https://rinkeby.etherscan.io/address/${address}`;
};

export const getEtherscanToken = (chainId: number, token: string) => {
  return chainId === 1
    ? `https://etherscan.io/token/${token}`
    : `https://rinkeby.etherscan.io/token/${token}`;
};

export const getEtherscanTransaction = (chainId: number, txHash: string) => {
  return chainId === 1
    ? `https://etherscan.io/tx/${txHash}`
    : `https://rinkeby.etherscan.io/tx/${txHash}`;
};
