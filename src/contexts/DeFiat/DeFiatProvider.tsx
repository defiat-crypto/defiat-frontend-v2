import React, { useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import {DeFiatContext} from './DeFiatContext'
import DeFiat from '../../defiat'

declare global {
  interface Window {
    defiatBurn: any
  }
}

const DeFiatProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [defiat, setDeFiat] = useState<DeFiat>()

  // @ts-ignore
  window.defiat = defiat
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const defiatLib = new DeFiat(ethereum, 1, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setDeFiat(defiatLib)
      window.defiatBurn = defiatLib
    }
  }, [ethereum])

  return <DeFiatContext.Provider value={{ dft: defiat }}>{children}</DeFiatContext.Provider>
}

export default DeFiatProvider