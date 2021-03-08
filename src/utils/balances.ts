import { BigNumber } from "bignumber.js";

export const getBalanceNumber = (balance: BigNumber, decimals: number = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals));
  return displayBalance.toNumber();
};

export const getDisplayBalance = (
  balance: BigNumber,
  decimals: number = 18
) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals));
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4);
  } else {
    return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const getDisplayBalanceFixed = (
  balance: BigNumber,
  decimals: number = 18
) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals));
  if (displayBalance.lt(1)) {
    return displayBalance.toFixed(0);
  } else {
    return displayBalance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const getFullDisplayBalance = (
  balance: BigNumber,
  decimals: number = 18
) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed();
};
