import { Value } from "components/Value";
import { StakingPool } from "constants/pools";
import { TransactionReceipt } from "web3-core";
import { Contract } from "web3-eth-contract";
import { BigNumber, getTetherAddress } from ".";
import { debug } from "../utils";
import { DeFiat } from "./DeFiat";
import { getDeFiatAddress, getPointsAddress } from "./utils";

// Token

export const viewFeeRate = async (DeFiat: Contract): Promise<string> => {
  try {
    const feeRate = await DeFiat.methods._viewFeeRate().call();
    return feeRate;
  } catch (e) {
    debug(e);
    return "0";
  }
};

export const viewBurnRate = async (DeFiat: Contract): Promise<string> => {
  try {
    const burnRate = await DeFiat.methods._viewBurnRate().call();
    return burnRate;
  } catch (e) {
    debug(e);
    return "0";
  }
};

export const getSupplyBurndown = async (
  DeFiat: Contract,
  startBlock: number,
  endBlock: number
) => {
  return [500000, 499500, 498350, 493900, 490000, 486800, 480490, 478500];

  //   try {
  //     const earliestBlock = 11749554;
  //     const dataPoints = 6;

  //     const supplyBurndown = await DeFiat.getPastEvents("Transfer", {
  //       fromBlock: earliestBlock,
  //       toBlock: "latest",
  //       filter: { to: "0x0000000000000000000000000000000000000000" },
  //     });

  //     const latest = supplyBurndown[supplyBurndown.length - 1].blockNumber;
  //     const delta = latest - earliestBlock;
  //     const blocksPerDataPoint = delta / dataPoints;
  //     const blocks = [];
  //     for (let i = 0; i < dataPoints; i++) {
  //       blocks.push(earliestBlock + blocksPerDataPoint * i);
  //     }

  //     const supply = [new BigNumber(500000).multipliedBy(1e18)];
  //     let pointer = 0;
  //     supplyBurndown.forEach((burn) => {
  //       if (burn.blockNumber > blocks[pointer]) {
  //         supply.push(supply[pointer]);
  //         pointer++;
  //       }
  //       supply[pointer] = supply[pointer].minus(burn.returnValues.value);
  //     });

  //     return supply.map((s) => s.dividedBy(1e18).toNumber()); //[maxSupply.toNumber(), ...supply]
  //   } catch (e) {
  //     debug(e);
  //     return [];
  //   }
};

// Points

export const viewDiscountOf = async (
  Points: Contract,
  address: string
): Promise<number> => {
  try {
    const discount: number = await Points.methods
      .viewDiscountOf(address)
      .call();
    return discount;
  } catch (e) {
    debug(e);
    return 0;
  }
};

export const viewDiscountPointsNeeded = async (
  Points: Contract,
  tranche: number
): Promise<string> => {
  try {
    const discount: number = await Points.methods
      .discountPointsNeeded(tranche)
      .call();
    return discount.toString();
  } catch (e) {
    debug(e);
    return "0";
  }
};

export const updateDiscountOf = async (
  Points: Contract,
  address: string
): Promise<string> => {
  return Points.methods
    .updateMyDiscount()
    .send({ from: address })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

// Price

export const getTokenPrice = async (
  Oracle: Contract,
  token: string
): Promise<BigNumber> => {
  try {
    const tokenPrice = await Oracle.methods.getUniPrice(token).call();
    return new BigNumber(tokenPrice);
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

// 2ND

export const swapFor2ndChance = async (
  SecondChance: Contract,
  account: string,
  ethAmount: string,
  ruggedToken: string,
  ruggedAmount: string
) => {
  return SecondChance.methods
    .swapfor2NDChance(ruggedToken, ruggedAmount)
    .send({
      from: account,
      value: ethAmount,
    })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const get2ndChanceSwapRate = async (
  SecondChance: Contract,
  account: string,
  ruggedToken: string,
  ruggedAmount: string
) => {
  try {
    const result = await SecondChance.methods
      .toMint(account, ruggedToken, ruggedAmount)
      .call();
    return new BigNumber(result);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const getEthFee = async (SecondChance: Contract) => {
  try {
    const result = await SecondChance.methods.viewETHfee().call();
    return new BigNumber(result);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const faucet = async (Shitcoin: Contract, account: string) => {
  return Shitcoin.methods
    .faucet()
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

// Rug Sanctuary

export const depositPool = async (
  RugSanctuary: Contract,
  account: string,
  amount: string
) => {
  return await RugSanctuary.methods
    .deposit(0, amount)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const withdrawPool = async (
  RugSanctuary: Contract,
  account: string,
  amount: string
) => {
  return await RugSanctuary.methods
    .withdraw(0, amount.toString())
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const stakedPool = async (RugSanctuary: Contract, account: string) => {
  try {
    const result = await RugSanctuary.methods.userInfo(0, account).call();
    return new BigNumber(result.amount);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const pendingPool = async (RugSanctuary: Contract, account: string) => {
  try {
    const result = await RugSanctuary.methods.pending(0, account).call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

// AnyStake

export const claimAnyStake = async (
  AnyStake: Contract,
  account: string,
  pid: number
) => {
  return await AnyStake.methods
    .claim(pid)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const depositAnyStake = async (
  AnyStake: Contract,
  account: string,
  pid: number,
  amount: string
) => {
  return await AnyStake.methods
    .deposit(pid, amount)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const withdrawAnyStake = async (
  AnyStake: Contract,
  account: string,
  pid: number,
  amount: string
) => {
  return await AnyStake.methods
    .withdraw(pid, amount)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const totalStakedAnyStake = async (AnyStake: Contract, pid: number) => {
  try {
    const result = await AnyStake.methods.poolInfo(pid).call();
    return new BigNumber(result.totalStaked);
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

export const totalValueStakedAllPoolsAnyStake = async (
  Oracle: Contract,
  Defiat: DeFiat,
  AnyStake: Contract,
  pools: StakingPool[]
) => {
  try {
    //const tetherprice = await getTokenPrice(Oracle, getTetherAddress(Defiat));
    var totalAllPools: BigNumber = new BigNumber(0);
    for (const pool of pools) {
      totalAllPools = totalAllPools.plus(
        await totalValueStakedPoolAnyStake(Oracle, Defiat, AnyStake, pool)
      );
    }
    return totalAllPools;
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

export const totalValueStakedPoolAnyStake = async (
  Oracle: Contract,
  Defiat: DeFiat,
  AnyStake: Contract,
  pool: StakingPool
) => {
  try {
    const tetherprice = await getTokenPrice(Oracle, getTetherAddress(Defiat));
    const result = await AnyStake.methods.poolInfo(pool.pid).call();
    const tokenprice = await getTokenPrice(Oracle, pool.address);
    return tetherprice
      .dividedBy(tokenprice)
      .multipliedBy(result.totalStaked)
      .dividedBy(new BigNumber(10).pow(pool.decimals));
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

export const stakingFeeAnyStake = async (AnyStake: Contract, pid: number) => {
  try {
    const result = await AnyStake.methods.poolInfo(pid).call();
    return new BigNumber(result.stakingFee);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const vipAmountAnyStake = async (AnyStake: Contract, pid: number) => {
  try {
    const result = await AnyStake.methods.poolInfo(pid).call();
    return new BigNumber(result.vipAmount);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const stakedAnyStake = async (
  AnyStake: Contract,
  pid: number,
  account: string
) => {
  try {
    const result = await AnyStake.methods.userInfo(pid, account).call();
    return new BigNumber(result.amount);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const totalValueStakedAnyStake = async (
  Oracle: Contract,
  Defiat: DeFiat,
  AnyStake: Contract,
  pools: StakingPool[],
  account: string
) => {
  try {
    const tetherprice = await getTokenPrice(Oracle, getTetherAddress(Defiat));
    var totalAllPools: BigNumber = new BigNumber(0);
    for (const pool of pools) {
      const userinfo = await AnyStake.methods
        .userInfo(pool.pid, account)
        .call();
      const tokenprice = await getTokenPrice(Oracle, pool.address);
      totalAllPools = totalAllPools.plus(
        tetherprice
          .dividedBy(tokenprice)
          .multipliedBy(userinfo.amount)
          .dividedBy(new BigNumber(10).pow(pool.decimals))
      );
    }
    return new BigNumber(totalAllPools);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const totalPoolsStakedAnyStake = async (
  AnyStake: Contract,
  pools: StakingPool[],
  account: string
) => {
  try {
    var totalAllPools: number = 0;
    for (const pool of pools) {
      const userinfo = await AnyStake.methods
        .userInfo(pool.pid, account)
        .call();
      if (userinfo.amount > 0) totalAllPools++;
    }
    return totalAllPools.toString();
  } catch (e) {
    debug(e);
    return "0";
  }
};

export const pendingAnyStake = async (
  RugSanctuary: Contract,
  pid: number,
  account: string
) => {
  try {
    const result = await RugSanctuary.methods.pending(pid, account).call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const totalPendingAnyStake = async (
  AnyStake: Contract,
  pools: StakingPool[],
  account: string
) => {
  try {
    var totalPending: BigNumber = new BigNumber(0);
    for (const pool of pools) {
      const result = await AnyStake.methods.pending(pool.pid, account).call();
      totalPending = totalPending.plus(result);
    }
    return new BigNumber(totalPending);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const getPoolApr = async (
  Oracle: Contract,
  Defiat: DeFiat,
  Vault: Contract,
  AnyStake: Contract,
  pools: StakingPool[],
  pid: number
) => {
  try {
    const latestDistributionBlock = new BigNumber(
      await Vault.methods.lastDistributionBlock().call()
    )
    const rewardsDistributed = await Vault.getPastEvents("RewardsDistributed", {
      fromBlock: latestDistributionBlock.minus(50000),
      toBlock: latestDistributionBlock,
    });

    const earliestBlock = rewardsDistributed[0].blockNumber;

    //skip rewards from earliestblock, they fall outside the delta.
    rewardsDistributed.shift();
    const delta = latestDistributionBlock.minus(earliestBlock);
    let rewardsSum = new BigNumber("0");
    //count all rewards between latestDistributionBlock and earliestBlock
    rewardsDistributed.forEach((rewards) => {
      rewardsSum = rewardsSum.plus(new BigNumber(rewards.returnValues['anystakeAmount']));
    });
    const blockrewards = rewardsSum.dividedBy(delta);

    const valuePool = await totalValueStakedPoolAnyStake(
      Oracle,
      Defiat,
      AnyStake,
      pools[pid]
    );
    const totalAlloc = new BigNumber(
      await AnyStake.methods.totalAllocPoint().call()
    );
    const poolAlloc = new BigNumber(
      (await AnyStake.methods.poolInfo(pid).call()).allocPoint
    );
    const dftprice = await getTokenPrice(Oracle, getDeFiatAddress(Defiat));
    const tetherprice = await getTokenPrice(Oracle, getTetherAddress(Defiat));

    const rewardsperyear = tetherprice
      .dividedBy(dftprice)
      .multipliedBy(poolAlloc.dividedBy(totalAlloc))
      .multipliedBy(blockrewards)
      .multipliedBy(new BigNumber(2073600))
      .multipliedBy(1e2);
    const apy = rewardsperyear.dividedBy(valuePool);
    return apy;
  } catch (e) {
    return new BigNumber("0");
  }
};

// Regulator

export const getRegulatorApr = async (
  Oracle: Contract,
  Defiat: DeFiat,
  Vault: Contract,
  Regulator: Contract
) => {
  try {
    const latestDistributionBlock = new BigNumber(
      await Vault.methods.lastDistributionBlock().call()
    )
    const rewardsDistributed = await Vault.getPastEvents("RewardsDistributed", {
      fromBlock: latestDistributionBlock.minus(50000),
      toBlock: latestDistributionBlock,
    });
    const earliestBlock = rewardsDistributed[0].blockNumber;

    //skip rewards from earliestblock, they fall outside the delta.
    rewardsDistributed.shift();
    const delta = latestDistributionBlock.minus(earliestBlock);
    let rewardsSum = new BigNumber("0");
    //count all rewards between latestDistributionBlock and earliestBlock
    rewardsDistributed.forEach((rewards) => {
      rewardsSum = rewardsSum.plus(new BigNumber(rewards.returnValues['regulatorAmount']));
    });
    const blockrewards = rewardsSum.dividedBy(delta);

    const totalStaked = await totalStakedRegulator(
      Regulator
    );
    const pointsprice = await getTokenPrice(Oracle, getPointsAddress(Defiat));
    const dftprice = await getTokenPrice(Oracle, getDeFiatAddress(Defiat));
    const tetherprice = await getTokenPrice(Oracle, getTetherAddress(Defiat));

    const valueRegulator = tetherprice
      .dividedBy(pointsprice)
      .multipliedBy(totalStaked)
      .dividedBy(1e18);

    const rewardsperyear = tetherprice
      .dividedBy(dftprice)
      .multipliedBy(blockrewards)
      .multipliedBy(0.7) //70% to rewards
      .multipliedBy(new BigNumber(2073600))
      .multipliedBy(1e2);
    const apy = rewardsperyear.dividedBy(valueRegulator);
    return apy;
  } catch (e) {
    console.log(e);
    return new BigNumber("0");
  }
};

export const claimRegulator = async (Regulator: Contract, account: string) => {
  return await Regulator.methods
    .claim()
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const depositRegulator = async (
  Regulator: Contract,
  account: string,
  amount: string
) => {
  return await Regulator.methods
    .deposit(amount)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const withdrawRegulator = async (
  Regulator: Contract,
  account: string,
  amount: string
) => {
  return await Regulator.methods
    .withdraw(amount)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const totalStakedRegulator = async (Regulator: Contract) => {
  try {
    const result = await Regulator.methods.totalShares().call();
    return new BigNumber(result);
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

export const multiplierRegulator = async (Regulator: Contract) => {
  try {
    const result = await Regulator.methods.priceMultiplier().call();
    return result;
  } catch (e) {
    debug(e);
    return 0;
  }
};

export const stakedRegulator = async (Regulator: Contract, account: string) => {
  try {
    const result = await Regulator.methods.userInfo(account).call();
    return new BigNumber(result.amount);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const pendingRegulator = async (
  Regulator: Contract,
  account: string
) => {
  try {
    const result = await Regulator.methods.pending(account).call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const buybackRegulator = async (
  Regulator: Contract
) => {
  try {
    const value = await Regulator.methods.buybackBalance().call();
    return new BigNumber(value);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const isAbovePeg = async (
  Regulator: Contract
) => {
  try {
    const value = await Regulator.methods.isAbovePeg().call();
    return value;
  } catch (e) {
    return true;
  }
};




