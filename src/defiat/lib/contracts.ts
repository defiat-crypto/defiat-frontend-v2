import Web3 from 'web3'
import {ConfirmationType} from './confirmationType'
import {Contract} from 'web3-eth-contract'

export class Contracts {
  web3:Web3
  defaultConfirmations?:number
  autoGasMultiplier?:number
  confirmationType?:typeof ConfirmationType
  blockGasLimit?:number
  defaultGas?:number
  defaultGasPrice?:number

  constructor(provider:any, networkId:number, web3:Web3, options:any) {
    this.web3 = web3
    this.defaultConfirmations = options.defaultConfirmations
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5
    this.confirmationType =
      options.confirmationType || ConfirmationType.Confirmed
    this.defaultGas = options.defaultGas
    this.defaultGasPrice = options.defaultGasPrice

    // this.defiat = new this.web3.eth.Contract(SushiAbi)
    // this.points = new this.web3.eth.Contract(MasterChefAbi)
    // this.governance = new this.web3.eth.Contract(WETHAbi)
    // this.second = new this.web3.eth.Contract(WETHAbi)
    // this.anystake = new this.web3.eth.Contract(WETHAbi)

    this.setProvider(provider, networkId)
    this.setDefaultAccount(this.web3.eth.defaultAccount)
  }

  setProvider(provider:any, networkId:number) {
    const setProvider = (contract:any, address:string) => {
      contract.setProvider(provider)
      if (address) contract.options.address = address
      else console.error('Contract address not found in network', networkId)
    }

    // setProvider(this.sushi, contractAddresses.sushi[networkId])
    // setProvider(this.masterChef, contractAddresses.masterChef[networkId])
    // setProvider(this.weth, contractAddresses.weth[networkId])
  }

  setDefaultAccount(account:string | null) {
    // this.defiat.options.from = account
    // this.anystake.options.from = account
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