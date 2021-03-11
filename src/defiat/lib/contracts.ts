import Web3 from "web3";
import { ConfirmationType } from "./confirmationType";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import Addresses from "../../constants/addresses";
import DeFiatToken from "../../constants/abi/DeFiat_Token.json";
import DeFiatPoints from "../../constants/abi/DeFiat_Points.json";
import DeFiatGovernance from "../../constants/abi/DeFiat_Gov.json";
import SecondChanceToken from "../../constants/abi/SecondChance.json";
import RugSanctuaryPool from "../../constants/abi/RugSanctuary.json";
import UniswapOracle from "../../constants/abi/Uni_Price_v2.json";
import AnyStakeAbi from "../../constants/abi/AnyStake.json";
import RegulatorAbi from "../../constants/abi/AnyStakeRegulator.json";
import VaultAbi from "../../constants/abi/AnyStakeVault.json";

export class Contracts {
  web3: Web3;
  defaultConfirmations?: number;
  autoGasMultiplier?: number;
  confirmationType?: typeof ConfirmationType;
  blockGasLimit?: number;
  defaultGas?: number;
  defaultGasPrice?: number;

  DeFiat: Contract;
  Points: Contract;
  Governance: Contract;
  Second: Contract;
  RugSanctuary: Contract;
  Oracle: Contract;
  AnyStake: Contract;
  Regulator: Contract;
  Vault: Contract;

  constructor(provider: any, networkId: number, web3: Web3, options: any) {
    this.web3 = web3;
    this.defaultConfirmations = options.defaultConfirmations;
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5;
    this.confirmationType =
      options.confirmationType || ConfirmationType.Confirmed;
    this.defaultGas = options.defaultGas;
    this.defaultGasPrice = options.defaultGasPrice;

    this.DeFiat = new this.web3.eth.Contract(
      DeFiatToken as AbiItem[],
      Addresses.DeFiat[networkId]
    );
    this.Points = new this.web3.eth.Contract(
      DeFiatPoints as AbiItem[],
      Addresses.Points[networkId]
    );
    this.Governance = new this.web3.eth.Contract(
      DeFiatGovernance as AbiItem[],
      Addresses.Governance[networkId]
    );
    this.Second = new this.web3.eth.Contract(
      SecondChanceToken as AbiItem[],
      Addresses.Second[networkId]
    );
    this.RugSanctuary = new this.web3.eth.Contract(
      RugSanctuaryPool as AbiItem[],
      Addresses.RugSanctuary[networkId]
    );
    this.Oracle = new this.web3.eth.Contract(
      UniswapOracle as AbiItem[],
      Addresses.Oracle[networkId]
    );
    this.AnyStake = new this.web3.eth.Contract(
      AnyStakeAbi as AbiItem[],
      Addresses.AnyStake[networkId]
    );
    this.Regulator = new this.web3.eth.Contract(
      RegulatorAbi as AbiItem[],
      Addresses.Regulator[networkId]
    );
    this.Vault = new this.web3.eth.Contract(
      VaultAbi as AbiItem[],
      Addresses.Vault[networkId]
    );

    // this.setProvider(provider, networkId)
    this.setDefaultAccount(this.web3.eth.defaultAccount!);
  }

  setProvider(provider: any, networkId: number) {
    const setProvider = (contract: Contract, address: string) => {
      // contract.setProvider(provider)
      if (address) {
        contract.options.address = address;
      } else {
        console.error("Contract address not found in network", networkId);
      }
    };

    setProvider(this.DeFiat, Addresses.DeFiat[networkId]);
    setProvider(this.Points, Addresses.Points[networkId]);
    setProvider(this.Governance, Addresses.Governance[networkId]);
    setProvider(this.Second, Addresses.Second[networkId]);
    setProvider(this.RugSanctuary, Addresses.RugSanctuary[networkId]);
    setProvider(this.Oracle, Addresses.Second[networkId]);
    setProvider(this.AnyStake, Addresses.RugSanctuary[networkId]);
    setProvider(this.Regulator, Addresses.Second[networkId]);
    setProvider(this.Vault, Addresses.RugSanctuary[networkId]);
  }

  setDefaultAccount(account: string) {
    this.DeFiat.options.from = account;
    this.Points.options.from = account;
    this.Governance.options.from = account;
    this.Second.options.from = account;
    this.RugSanctuary.options.from = account;
    this.Oracle.options.from = account;
    this.AnyStake.options.from = account;
    this.Regulator.options.from = account;
    this.Vault.options.from = account;
  }

  // async callContractFunction(method, options) {
  //   const {
  //     confirmations,
  //     confirmationType,
  //     autoGasMultiplier,
  //     ...txOptions
  //   } = options

  //   if (!this.blockGasLimit) {
  //     await this.setGasLimit()
  //   }

  //   if (!txOptions.gasPrice && this.defaultGasPrice) {
  //     txOptions.gasPrice = this.defaultGasPrice
  //   }

  //   if (confirmationType === ConfirmationType.Simulate || !options.gas) {
  //     let gasEstimate
  //     if (
  //       this.defaultGas &&
  //       confirmationType !== ConfirmationType.Simulate
  //     ) {
  //       txOptions.gas = this.defaultGas
  //     } else {
  //       try {
  //         console.log('estimating gas')
  //         gasEstimate = await method.estimateGas(txOptions)
  //       } catch (error) {
  //         const data = method.encodeABI()
  //         const { from, value } = options
  //         const to = method._parent._address
  //         error.transactionData = { from, value, data, to }
  //         throw error
  //       }

  //       const multiplier = autoGasMultiplier || this.autoGasMultiplier
  //       const totalGas = Math.floor(gasEstimate * multiplier)
  //       txOptions.gas =
  //         totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit
  //     }

  //     if (confirmationType === Types.ConfirmationType.Simulate) {
  //       let g = txOptions.gas
  //       return { gasEstimate, g }
  //     }
  //   }

  //   if (txOptions.value) {
  //     txOptions.value = new BigNumber(txOptions.value).toFixed(0)
  //   } else {
  //     txOptions.value = '0'
  //   }

  //   const promi = method.send(txOptions)

  //   const OUTCOMES = {
  //     INITIAL: 0,
  //     RESOLVED: 1,
  //     REJECTED: 2,
  //   }

  //   let hashOutcome = OUTCOMES.INITIAL
  //   let confirmationOutcome = OUTCOMES.INITIAL

  //   const t =
  //     confirmationType !== undefined ? confirmationType : this.confirmationType

  //   if (!Object.values(ConfirmationType).includes(t)) {
  //     throw new Error(`Invalid confirmation type: ${t}`)
  //   }

  //   let hashPromise
  //   let confirmationPromise

  //   if (
  //     t === ConfirmationType.Hash ||
  //     t === ConfirmationType.Both
  //   ) {
  //     hashPromise = new Promise((resolve, reject) => {
  //       promi.on('error', (error:any) => {
  //         if (hashOutcome === OUTCOMES.INITIAL) {
  //           hashOutcome = OUTCOMES.REJECTED
  //           reject(error)
  //           const anyPromi = promi
  //           anyPromi.off()
  //         }
  //       })

  //       promi.on('transactionHash', (txHash:any) => {
  //         if (hashOutcome === OUTCOMES.INITIAL) {
  //           hashOutcome = OUTCOMES.RESOLVED
  //           resolve(txHash)
  //           if (t !== ConfirmationType.Both) {
  //             const anyPromi = promi
  //             anyPromi.off()
  //           }
  //         }
  //       })
  //     })
  //   }

  //   if (
  //     t === ConfirmationType.Confirmed ||
  //     t === ConfirmationType.Both
  //   ) {
  //     confirmationPromise = new Promise((resolve, reject) => {
  //       promi.on('error', (error:any) => {
  //         if (
  //           (t === Types.ConfirmationType.Confirmed ||
  //             hashOutcome === OUTCOMES.RESOLVED) &&
  //           confirmationOutcome === OUTCOMES.INITIAL
  //         ) {
  //           confirmationOutcome = OUTCOMES.REJECTED
  //           reject(error)
  //           const anyPromi = promi
  //           anyPromi.off()
  //         }
  //       })

  //       const desiredConf = confirmations || this.defaultConfirmations
  //       if (desiredConf) {
  //         promi.on('confirmation', (confNumber:any, receipt:any) => {
  //           if (confNumber >= desiredConf) {
  //             if (confirmationOutcome === OUTCOMES.INITIAL) {
  //               confirmationOutcome = OUTCOMES.RESOLVED
  //               resolve(receipt)
  //               const anyPromi = promi
  //               anyPromi.off()
  //             }
  //           }
  //         })
  //       } else {
  //         promi.on('receipt', (receipt:any) => {
  //           confirmationOutcome = OUTCOMES.RESOLVED
  //           resolve(receipt)
  //           const anyPromi = promi
  //           anyPromi.off()
  //         })
  //       }
  //     })
  //   }

  //   if (t === ConfirmationType.Hash) {
  //     const transactionHash = await hashPromise
  //     if (this.notifier) {
  //       this.notifier.hash(transactionHash)
  //     }
  //     return { transactionHash }
  //   }

  //   if (t === ConfirmationType.Confirmed) {
  //     return confirmationPromise
  //   }

  //   const transactionHash = await hashPromise
  //   if (this.notifier) {
  //     this.notifier.hash(transactionHash)
  //   }
  //   return {
  //     transactionHash,
  //     confirmation: confirmationPromise,
  //   }
  // }

  // async callConstantContractFunction(method, options) {
  //   const m2 = method
  //   const { blockNumber, ...txOptions } = options
  //   return m2.call(txOptions, blockNumber)
  // }

  // async setGasLimit() {
  //   const block = await this.web3.eth.getBlock('latest')
  //   this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT
  // }
}
