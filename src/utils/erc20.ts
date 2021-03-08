import Web3 from "web3";
import { provider, TransactionReceipt } from "web3-core";
import { AbiItem } from "web3-utils";
import ERC20 from "../constants/abi/_ERC20.json";
import BigNumber from "bignumber.js";
import { debug } from "./config";
import { ethers } from "ethers";

export const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract((ERC20 as any) as AbiItem, address);
  return contract;
};

export const approve = async (
  tokenAddress: string,
  spendingAddress: string,
  provider: provider,
  account: string
) => {
  const tokenContract = getContract(provider, tokenAddress);
  return tokenContract.methods
    .approve(spendingAddress, ethers.constants.MaxUint256.toString())
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const getAllowance = async (
  tokenAddress: string,
  spendingAddress: string,
  provider: provider,
  account: string
) => {
  try {
    const tokenContract = getContract(provider, tokenAddress);
    const allowance = await tokenContract.methods
      .allowance(account, spendingAddress)
      .call();
    return new BigNumber(allowance);
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

export const getBalance = async (
  tokenAddress: string,
  userAddress: string,
  provider: provider
) => {
  try {
    const tokenContract = getContract(provider, tokenAddress);
    const balance = await tokenContract.methods.balanceOf(userAddress).call();
    return new BigNumber(balance);
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

export const getTotalSupply = async (
  tokenAddress: string,
  provider: provider
) => {
  try {
    const tokenContract = getContract(provider, tokenAddress);
    const balance = await tokenContract.methods.totalSupply().call();
    return new BigNumber(balance);
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};
