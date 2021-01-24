import { Transaction, TransactionReceipt } from "web3-core";
import { Contract } from "web3-eth-contract";
import { hexToUtf8, toUtf8 } from "web3-utils";
import { BigNumber } from ".";
import { debug } from "../utils";


export const viewFeeRate = async (DeFiat:Contract): Promise<string> => {
  try {
    const feeRate = await DeFiat.methods
      ._viewFeeRate()
      .call()
    return feeRate
  } catch (e) {
    debug(e);
    return '0';
  }
}

export const viewBurnRate = async (DeFiat:Contract): Promise<string> => {
  try {
    const burnRate = await DeFiat.methods
      ._viewBurnRate()
      .call()
    return burnRate;
  } catch (e) {
    debug(e)
    return '0';
  }
}

export const getSupplyBurndown = async (DeFiat:Contract, startBlock:number, endBlock:number) => {
  try {
    const supplyBurndown = await DeFiat.getPastEvents('Transfer',
      {
        fromBlock: 'earliest',
        toBlock: 'latest',
        filter: {to: '0x0000000000000000000000000000000000000000'}
      })

    const burns = supplyBurndown.map((burn) => new BigNumber(burn.returnValues.value).dividedBy(1e18))

    let maxSupply = new BigNumber(500000)
    const supply = burns.map((burn, i) => {
      maxSupply = maxSupply.minus(burn)
      return maxSupply.toNumber()
    })
    return supply//[maxSupply.toNumber(), ...supply]
  } catch (e) {
    debug(e)
    return []
  }
}

export const viewDiscountOf = async (Points:Contract, address:string): Promise<string> => {
  try {
    const discount:number = await Points.methods
      .viewDiscountOf(address)
      .call()
    return discount.toString();
  } catch (e) {
    debug(e)
    return '0'
  }
}

export const viewDiscountPointsNeeded = async (Points:Contract, tranche:number): Promise<string> => {
  try {
    const discount:number = await Points.methods
      .discountPointsNeeded(tranche)
      .call()
    return discount.toString();
  } catch (e) {
    debug(e)
    return '0'
  }
}

export const updateDiscountOf = async (Points:Contract, address:string): Promise<string> => {
  return Points.methods
    .updateMyDiscountOf()
    .send({ from: address })
    .on('transactionHash', (tx:TransactionReceipt) => {
      debug(tx)
      return tx.transactionHash
    })
}

export const getTokenPrice = async (Oracle:Contract, token:string): Promise<string> => {
  try {
    const tokenPrice = await Oracle.methods
      .getUniPrice(token)
      .call()
    return tokenPrice;
  } catch (e) {
    debug(e)
    return '0';
  }
}