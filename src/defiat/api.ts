import Addresses from "constants/addresses";
import { Pools, StakingPool } from "constants/pools";
import { provider, TransactionReceipt } from "web3-core";
import { Contract } from "web3-eth-contract";
import { BigNumber } from ".";
import { debug, getBalance } from "../utils";
import { DeFiat } from "./DeFiat";
import { ProcessedRewards } from "./lib/processedRewards";
import {
  getCircleAddress,
  getCircleLpAddress,
  getDeFiatAddress,
  getDeFiatLpAddress,
  getPointsAddress,
  getPointsLpAddress,
  getVaultV2Address,
} from "./utils";

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
    if (token === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
      return new BigNumber(10).pow(18);
    } else {
      const tokenPrice = await Oracle.methods.getUniPrice(token).call();
      return new BigNumber(tokenPrice);
    }
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

export const getVaultPrice = async (
  Vault: Contract,
  token: string,
  lpToken: string
): Promise<BigNumber> => {
  try {
    const tokenPrice = await Vault.methods.getTokenPrice(token, lpToken).call();
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

export const claimAllAnyStake = async (AnyStake: Contract, account: string) => {
  return await AnyStake.methods
    .claimAll()
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
  Vault: Contract,
  Defiat: DeFiat,
  AnyStake: Contract,
  pools: StakingPool[]
) => {
  try {
    let totalAllPools = new BigNumber("0");
    for (let pool of pools) {
      const totalPoolValue = await totalValueStakedPoolAnyStake(
        Vault,
        Defiat,
        AnyStake,
        pool
      );
      totalAllPools = totalAllPools.plus(totalPoolValue);
    }
    return totalAllPools;
  } catch (e) {
    debug(`ALL POOL STAKE ${e}`);
    return new BigNumber(0);
  }
};

export const totalValueStakedPoolAnyStake = async (
  Vault: Contract,
  DeFiat: DeFiat,
  AnyStake: Contract,
  pool: StakingPool
) => {
  try {
    const poolInfo = await AnyStake.methods.poolInfo(pool.pid).call();
    const tokenPrice = await getVaultPrice(
      Vault,
      poolInfo.stakedToken.toString(),
      poolInfo.lpToken.toString()
    );
    const circlePrice = await getVaultPrice(
      Vault,
      getCircleAddress(DeFiat),
      getCircleLpAddress(DeFiat)
    );

    return tokenPrice
      .times(1e18)
      .div(circlePrice)
      .times(poolInfo.totalStaked)
      .div(new BigNumber(10).pow(pool.decimals));
  } catch (e) {
    debug(`Staked Value ${e}`);
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
  Vault: Contract,
  DeFiat: DeFiat,
  AnyStake: Contract,
  pools: StakingPool[],
  account: string
) => {
  try {
    const circlePrice = await getVaultPrice(
      Vault,
      getCircleAddress(DeFiat),
      getCircleLpAddress(DeFiat)
    );

    let totalAllPools = new BigNumber(0);
    for (const pool of pools) {
      const userInfo = await AnyStake.methods
        .userInfo(pool.pid, account)
        .call();
      const poolInfo = await AnyStake.methods.poolInfo(pool.pid).call();
      const tokenPrice = await getVaultPrice(
        Vault,
        poolInfo.stakedToken.toString(),
        poolInfo.lpToken.toString()
      );

      totalAllPools = totalAllPools.plus(
        tokenPrice
          .times(1e18)
          .div(circlePrice)
          .times(userInfo.amount)
          .div(new BigNumber(10).pow(pool.decimals))
      );
    }
    return totalAllPools;
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
  AnyStake: Contract,
  pid: number,
  account: string
) => {
  try {
    const result = await AnyStake.methods.pending(pid, account).call();
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

export const totalPendingVirtualAnyStake = async (
  AnyStake: Contract,
  pools: StakingPool[],
  account: string,
  block: number
) => {
  try {
    var totalPending: BigNumber = new BigNumber(0);
    for (const pool of pools) {
      const result = await pendingVirtualAnyStake(
        AnyStake,
        pool.pid,
        account,
        block
      );
      totalPending = totalPending.plus(result);
    }
    return new BigNumber(totalPending);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const totalPendingVirtualAnyStakeV2 = async (
  AnyStakeV2: Contract,
  VaultV2: Contract,
  DeFiat: DeFiat,
  ethereum: provider,
  pools: StakingPool[],
  account: string,
  block: number
) => {
  try {
    var totalPending: BigNumber = new BigNumber(0);
    for (const pool of pools) {
      const result = await pendingVirtualAnyStakeV2(
        AnyStakeV2,
        VaultV2,
        DeFiat,
        ethereum,
        pool.pid,
        account,
        block
      );
      totalPending = totalPending.plus(result);
    }
    return new BigNumber(totalPending);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const totalPendingAnyStakeV2 = async (AnyStakeV2: Contract) => {
  try {
  } catch (e) {}
};

export const pendingAnyStakeV2 = async (AnyStakeV2: Contract, pid: number) => {
  try {
  } catch (e) {}
};

export const totalPendingRewardsAnyStake = async (AnyStake: Contract) => {
  try {
    const result = await AnyStake.methods.pendingRewards().call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const pendingVirtualAnyStake = async (
  AnyStake: Contract,
  pid: number,
  account: string,
  block: number
) => {
  try {
    if (block === 0) {
      return new BigNumber("0");
    }

    const values = await Promise.all([
      AnyStake.methods.poolInfo(pid).call(),
      AnyStake.methods.totalBlockDelta().call(),
      AnyStake.methods.pendingRewards().call(),
      AnyStake.methods.totalEligiblePools().call(),
      AnyStake.methods.lastRewardBlock().call(),
      AnyStake.methods.totalAllocPoint().call(),
      AnyStake.methods.userInfo(pid, account).call(),
      AnyStake.methods.pending(pid, account).call(),
    ]);

    const poolInfo = values[0];
    const totalBlockDelta = new BigNumber(values[1]);
    const pendingRewards = new BigNumber(values[2]);
    const totalEligiblePools = new BigNumber(values[3]);
    const lastRewardBlock = +values[4];
    const totalAlloc = +values[5];
    const userInfo = values[6];
    const pending = new BigNumber(values[7]);

    const poolBlockDelta = new BigNumber(block - +poolInfo.lastRewardBlock);
    const currentTotalBlockDelta = totalBlockDelta.plus(
      totalEligiblePools.times(block - lastRewardBlock)
    );

    const poolRewards = pendingRewards
      .times(poolBlockDelta)
      .div(currentTotalBlockDelta)
      .times(poolInfo.allocPoint)
      .div(totalAlloc);
    const virtualPending = poolRewards
      .times(userInfo.amount)
      .div(poolInfo.totalStaked);
    const result = pending.plus(virtualPending);
    return result.isNaN() ? new BigNumber("0") : result;
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const pendingVirtualAnyStakeV2 = async (
  AnyStakeV2: Contract,
  VaultV2: Contract,
  DeFiat: DeFiat,
  ethereum: provider,
  pid: number,
  account: string,
  block: number
) => {
  try {
    if (block === 0) {
      return new BigNumber("0");
    }

    const values = await Promise.all([
      AnyStakeV2.methods.poolInfo(pid).call(),
      AnyStakeV2.methods.userInfo(pid, account).call(),
      AnyStakeV2.methods.pending(pid, account).call(),
      AnyStakeV2.methods.rewardsPerAllocPoint().call(),
      AnyStakeV2.methods.totalAllocPoint().call(),
      getBalance(getDeFiatAddress(DeFiat), getVaultV2Address(DeFiat), ethereum),
      VaultV2.methods.pendingRewards().call(),
      VaultV2.methods.bondedRewards().call(),
      VaultV2.methods.lastDistributionBlock().call(),
      VaultV2.methods.bondedRewardsPerBlock().call(),
      VaultV2.methods.distributionRate().call(),
    ]);

    const poolInfo = values[0];
    const userInfo = values[1];
    const pending = new BigNumber(values[2]);
    const rewardsPerAllocPoint = new BigNumber(values[3]);
    const totalAllocPoint = new BigNumber(values[4]);

    const vaultBalance = new BigNumber(values[5]);
    const pendingRewardsVault = new BigNumber(values[6]);
    const bondedRewards = new BigNumber(values[7]);
    const lastDistributionBlock = new BigNumber(values[8]);
    const bondedRewardsPerBlock = new BigNumber(values[9]);
    const distributionRate = new BigNumber(values[10]).div(1000);

    // find the rewards that are waiting on the vault to be distributed
    const bondedAmount = bondedRewards.eq(0)
      ? 0
      : new BigNumber(block)
          .minus(lastDistributionBlock)
          .times(bondedRewardsPerBlock);
    const feeRewards = vaultBalance
      .minus(bondedRewards)
      .minus(pendingRewardsVault);
    const vaultPending = feeRewards.plus(bondedAmount);
    const totalVaultPending = vaultPending.times(distributionRate);
    const poolVaultRewards = totalVaultPending
      .times(poolInfo.allocPoint)
      .div(totalAllocPoint);

    // find rewards updated on anystake but not accrued into the pool
    const poolRewards = rewardsPerAllocPoint
      .times(poolInfo.allocPoint)
      .div(1e18)
      .minus(poolInfo.rewardDebt);

    // find the rewards with respect to user stake
    const virtualPending = poolRewards
      .plus(poolVaultRewards)
      .times(userInfo.amount)
      .div(poolInfo.totalStaked);

    const result = pending.plus(virtualPending);
    return result.isNaN() ? new BigNumber("0") : result;
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const getPoolApr = async (
  DeFiat: DeFiat,
  Vault: Contract,
  AnyStake: Contract,
  pool: StakingPool,
  pid: number
) => {
  try {
    const values = await Promise.all([
      Vault.methods.lastDistributionBlock().call(),
      AnyStake.methods.totalAllocPoint().call(),
      AnyStake.methods.poolInfo(pid).call(),
      getVaultPrice(
        Vault,
        getDeFiatAddress(DeFiat),
        getDeFiatLpAddress(DeFiat)
      ),
      getVaultPrice(
        Vault,
        getCircleAddress(DeFiat),
        getCircleLpAddress(DeFiat)
      ),
      totalValueStakedPoolAnyStake(Vault, DeFiat, AnyStake, pool),
    ]);

    const latestDistributionBlock = new BigNumber(values[0]);
    const totalAlloc = new BigNumber(values[1]);
    const poolAlloc = new BigNumber(values[2].allocPoint);
    const dftPrice = values[3];
    const circlePrice = values[4];
    const poolValue = values[5];

    // const fromBlock = latestDistributionBlock.minus(50000).lt(12175584)
    //   ? 12175584
    //   : latestDistributionBlock.minus(50000);

    const rewardsDistributed = await Vault.getPastEvents("RewardsDistributed", {
      fromBlock: latestDistributionBlock.minus(50000),
      toBlock: latestDistributionBlock,
    });

    const earliestBlock = rewardsDistributed[0].blockNumber;

    //skip rewards from earliestblock, they fall outside the delta.
    // rewardsDistributed.shift();
    const delta = latestDistributionBlock.minus(earliestBlock);
    let rewardsSum = new BigNumber("0");
    //count all rewards between latestDistributionBlock and earliestBlock
    rewardsDistributed.forEach((rewards) => {
      rewardsSum = rewardsSum.plus(
        new BigNumber(rewards.returnValues["anystakeAmount"])
      );
    });
    const rewardsPerBlock = rewardsSum.div(delta);

    const rewardsPerYear = dftPrice
      .times(1e18)
      .div(circlePrice)
      .times(poolAlloc.div(totalAlloc))
      .times(rewardsPerBlock)
      .times(new BigNumber(2073600))
      .times(1e2);
    const apy = rewardsPerYear.div(poolValue);
    return apy.isNaN() ? new BigNumber("0") : apy;
  } catch (e) {
    console.log("APR", e);
    return new BigNumber("0");
  }
};

// Regulator

export const getRegulatorApr = async (
  DeFiat: DeFiat,
  Vault: Contract,
  Regulator: Contract
) => {
  try {
    const values = await Promise.all([
      Vault.methods.lastDistributionBlock().call(),
      totalStakedRegulator(Regulator),
      getVaultPrice(
        Vault,
        getCircleAddress(DeFiat),
        getCircleLpAddress(DeFiat)
      ),
      getVaultPrice(
        Vault,
        getPointsAddress(DeFiat),
        getPointsLpAddress(DeFiat)
      ),
      getVaultPrice(
        Vault,
        getDeFiatAddress(DeFiat),
        getDeFiatLpAddress(DeFiat)
      ),
    ]);

    const latestDistributionBlock = new BigNumber(values[0]);
    const totalStaked = values[1];
    const circlePrice = values[2];
    const pointsPrice = values[3];
    const tokenPrice = values[4];

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
      rewardsSum = rewardsSum.plus(
        new BigNumber(rewards.returnValues["regulatorAmount"])
      );
    });
    const rewardsPerBlock = rewardsSum.dividedBy(delta);

    const valueRegulator = pointsPrice
      .times(1e18)
      .div(circlePrice)
      .times(totalStaked)
      .div(1e18);

    const rewardsperyear = tokenPrice
      .times(1e18)
      .div(circlePrice)
      .times(rewardsPerBlock)
      .times(0.7) // 70% to rewards
      .times(new BigNumber(2073600))
      .times(1e2);

    const apy = rewardsperyear.div(valueRegulator);
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

export const pendingTotalRegulator = async (Regulator: Contract) => {
  try {
    const result = await Regulator.methods.pendingRewards().call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const buybackRegulator = async (Regulator: Contract) => {
  try {
    const value = await Regulator.methods.buybackBalance().call();
    return new BigNumber(value);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const isAbovePeg = async (Regulator: Contract) => {
  try {
    const value = await Regulator.methods.isAbovePeg().call();
    return value;
  } catch (e) {
    return true;
  }
};

// Vault
export const getBondedRewards = async (Vault: Contract) => {
  try {
    const result = await Vault.methods.bondedRewards().call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const getPendingRewardsVault = async (Vault: Contract) => {
  try {
    const result = await Vault.methods.pendingRewards().call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const getIncomingRewardsVault = async (
  DeFiat: DeFiat,
  DeFiatToken: Contract,
  Vault: Contract,
  AnyStake: Contract,
  Regulator: Contract,
  chainid: number,
  blockNumber: number
) => {
  try {
    if (blockNumber === 0) return [];
    var rewardsData: ProcessedRewards[] = [];

    const incomingBuyBacks = await Vault.getPastEvents("DeFiatBuyback", {
      fromBlock: blockNumber - 5760,
      toBlock: blockNumber,
    });
    let id: number = 0;
    await asyncForEach(incomingBuyBacks, async (rewards) => {
      const block = await DeFiat.web3.eth.getBlock(rewards.blockNumber);
      rewardsData.push(
        new ProcessedRewards(
          id++,
          timeConverter(block.timestamp),
          rewards.returnValues["buybackAmount"],
          rewards.returnValues["tokenAmount"],
          getSymbol(rewards.returnValues["token"], chainid),
          rewards.transactionHash,
          "DeFiat Buyback",
          "In"
        )
      );
    });

    const pointsBuyBacks = await Vault.getPastEvents("PointsBuyback", {
      fromBlock: blockNumber - 5760,
      toBlock: blockNumber,
    });
    await asyncForEach(pointsBuyBacks, async (rewards) => {
      if (rewards.returnValues["token"] === Addresses.DeFiat[chainid]) {
        const block = await DeFiat.web3.eth.getBlock(rewards.blockNumber);
        rewardsData.push(
          new ProcessedRewards(
            id++,
            timeConverter(block.timestamp),
            rewards.returnValues["tokenAmount"],
            rewards.returnValues["buybackAmount"],
            getSymbol(rewards.returnValues["token"], chainid),
            rewards.transactionHash,
            "Points Buyback",
            "Out"
          )
        );
      }
    });

    const outgoingClaims = await AnyStake.getPastEvents("Claim", {
      fromBlock: blockNumber - 5760,
      toBlock: blockNumber,
    });

    await asyncForEach(outgoingClaims, async (rewards) => {
      const block = await DeFiat.web3.eth.getBlock(rewards.blockNumber);
      rewardsData.push(
        new ProcessedRewards(
          id++,
          timeConverter(block.timestamp),
          rewards.returnValues["amount"],
          undefined,
          undefined,
          rewards.transactionHash,
          "Claimed Rewards",
          "Out"
        )
      );
    });

    const outgoingClaimsRegulator = await Regulator.getPastEvents("Claim", {
      fromBlock: blockNumber - 5760,
      toBlock: blockNumber,
    });
    await asyncForEach(outgoingClaimsRegulator, async (rewards) => {
      const block = await DeFiat.web3.eth.getBlock(rewards.blockNumber);
      rewardsData.push(
        new ProcessedRewards(
          id++,
          timeConverter(block.timestamp),
          rewards.returnValues["amount"],
          undefined,
          undefined,
          rewards.transactionHash,
          "Claimed Rewards",
          "Out"
        )
      );
    });

    const incomingTransfers = await DeFiatToken.getPastEvents("Transfer", {
      fromBlock: blockNumber - 5760,
      toBlock: blockNumber,
      filter: { to: Addresses.Vault[chainid] },
    });
    await asyncForEach(incomingTransfers, async (rewards) => {
      const block = await DeFiat.web3.eth.getBlock(rewards.blockNumber);
      if (
        rewardsData.find(
          (x) => x.transactionHash === rewards.transactionHash
        ) === undefined
      ) {
        rewardsData.push(
          new ProcessedRewards(
            id++,
            timeConverter(block.timestamp),
            rewards.returnValues.value,
            undefined,
            undefined,
            rewards.transactionHash,
            "Transfer Fee",
            "In"
          )
        );
      }
    });
    rewardsData.sort((one, two) => (one.timestamp > two.timestamp ? -1 : 1));
    return rewardsData;
  } catch (e) {
    return [];
  }
};

function getSymbol(address: string, chainId: number) {
  if (Addresses.DeFiat[chainId] === address) return "DFTPv2";
  const pools: StakingPool[] = Pools[chainId];
  return pools.find((x) => x.address === address).symbol;
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();
  var hour = a.getHours().toString().padStart(2, "0");
  var min = a.getMinutes().toString().padStart(2, "0");
  var sec = a.getSeconds().toString().padStart(2, "0");
  var time =
    year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
  return time;
}

export async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number) => void
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}
