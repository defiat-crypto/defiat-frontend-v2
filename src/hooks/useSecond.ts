import { useCallback, useEffect, useMemo, useState } from "react"
import { useWallet } from "use-wallet"
import { provider } from "web3-core"
import Addresses from "../constants/addresses"
import { BigNumber, get2ndChanceSwapRate, getEthFee, getSecondContract, swapFor2ndChance } from "../defiat"
import { getAllowance, getBalance, getTotalSupply } from "../utils"
import { useBlock } from "./useBlock"
import { useDeFiat } from "./useDeFiat"

interface SecondData {
  ethFee:BigNumber;
  tokenBalance:BigNumber;
}

export const useSecond = () => {
  const {
    account,
    ethereum,
    chainId
  }: { account: string; ethereum: provider, chainId: number } = useWallet()
  const block = useBlock()
  const DeFiat = useDeFiat()
  
  // const [selected, setSelected] = useState<RugToken>()
  const [data, setData] = useState<SecondData>()

  const SecondChance = useMemo(() => getSecondContract(DeFiat), [DeFiat])

  const handleSwap = useCallback(async (ruggedToken:string, ruggedAmount:string) => {
    const txHash = await swapFor2ndChance(SecondChance, account, data.ethFee.toString(), ruggedToken, ruggedAmount)

  }, [account, data, SecondChance])

  const fetchSwapRate = useCallback(async (ruggedToken:string, ruggedAmount:string) => {
    const swapRate = await get2ndChanceSwapRate(SecondChance, account, ruggedToken, ruggedAmount);
    return swapRate
  }, [account, SecondChance])

  const fetchTokenData = useCallback(async (address:string) => {
    const values = await Promise.all([
      getBalance(address, account, ethereum),
      getAllowance(address, SecondChance.options.address, ethereum, account),
      getTotalSupply(address, ethereum)
    ])

    return {
      tokenBalance: values[0],
      tokenAllowance: values[1],
      tokenSupply: values[2]
    }
  }, [account, ethereum, SecondChance])
  
  const fetchData = useCallback(async () => {
    const values = await Promise.all([
      getBalance(Addresses.DeFiat[chainId], account, ethereum),
      getEthFee(SecondChance)
    ])

    setData({
      tokenBalance: values[0],
      ethFee: values[1]
    })
  }, [account, chainId, ethereum, SecondChance])
  

  useEffect(() => {
    if (!!account && !!SecondChance) {
      fetchData()

    }
  }, [account, block, fetchData, SecondChance])


  return {
    data,
    fetchSwapRate,
    fetchTokenData,
    swap: handleSwap
  }
}