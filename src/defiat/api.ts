import { TransactionReceipt } from "web3-core";
import { Contract } from "web3-eth-contract";
import { BigNumber } from ".";
import { debug } from "../utils";

// Token

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
    const earliestBlock = 10749554
    const dataPoints = 6

    const supplyBurndown = await DeFiat.getPastEvents('Transfer',
    {
      fromBlock: earliestBlock,
      toBlock: 'latest',
      filter: {to: '0x0000000000000000000000000000000000000000'}
    })

    const latest = supplyBurndown[supplyBurndown.length-1].blockNumber
    const delta = latest - earliestBlock;
    const blocksPerDataPoint = delta / dataPoints;
    const blocks = []
    for (let i = 0; i < dataPoints; i++) {
      blocks.push(earliestBlock + (blocksPerDataPoint*i))
    }

    const supply = [new BigNumber(500000).multipliedBy(1e18)]
    let pointer = 0
    supplyBurndown.forEach((burn) => {
      if (burn.blockNumber > blocks[pointer]) {
        supply.push(supply[pointer])
        pointer++;
      }
      supply[pointer] = supply[pointer].minus(burn.returnValues.value);
    })

    return supply.map(s => s.dividedBy(1e18).toNumber())//[maxSupply.toNumber(), ...supply]
  } catch (e) {
    debug(e)
    return []
  }
}

// Points

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

// Price

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

// 2ND

export const swapFor2ndChance = async (SecondChance:Contract, account:string, ethAmount:string, ruggedToken:string, ruggedAmount:string) => {
  return await SecondChance.methods
    .swapfor2NDChance(ruggedToken, ruggedAmount)
    .send({ 
      from: account,
      value: ethAmount
    })
    .on('transactionHash', (tx:TransactionReceipt) => {
      debug(tx)
      return tx.transactionHash
    })
}

export const get2ndChanceSwapRate = async (SecondChance:Contract, account:string, ruggedToken:string, ruggedAmount:string) => {
  try {
    const result = await SecondChance.methods
      .toMint(account, ruggedToken, ruggedAmount)
      .call()
    return new BigNumber(result)
  } catch (e) {
    debug(e)
    return new BigNumber('0')
  }
}

export const getEthFee = async (SecondChance:Contract) => {
  try {
    const result = await SecondChance.methods
      .viewETHfee()
      .call()
    return new BigNumber(result)
  } catch (e) {
    debug(e)
    return new BigNumber('0')
  }
}



// Rug Sanctuary

export const depositPool = async (RugSanctuary:Contract, account:string, amount:string) => {
  return await RugSanctuary.methods
    .deposit(0, amount)
    .send({ from: account })
    .on('transactionHash', (tx:TransactionReceipt) => {
      debug(tx)
      return tx.transactionHash
    })
}

export const withdrawPool = async (RugSanctuary:Contract, account:string, amount:string) => {
  return await RugSanctuary.methods
    .withdraw(0, amount.toString())
    .send({ from: account })
    .on('transactionHash', (tx:TransactionReceipt) => {
      debug(tx)
      return tx.transactionHash
    })
}

export const stakedPool = async (RugSanctuary:Contract, account:string) => {
  try {
    const result = await RugSanctuary.methods
      .userInfo(0, account)
      .call()
    return new BigNumber(result.amount)
  } catch (e) {
    return new BigNumber('0')
  }
}

export const pendingPool = async (RugSanctuary:Contract, account:string) => {
  try {
    const result = await RugSanctuary.methods
      .pending(0, account)
      .call()
    return new BigNumber(result)
  } catch (e) {
    console.log(e)
    return new BigNumber('0')
  }
}