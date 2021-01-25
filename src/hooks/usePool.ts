import { useCallback, useEffect, useMemo, useState } from "react"
import { useWallet } from "use-wallet"
import { provider } from "web3-core"
import Addresses from "../constants/addresses"
import { getRugSanctuaryContract, getSecondContract, stakedPool, pendingPool, BigNumber } from "../defiat"
import { getBalance, getDisplayBalance } from "../utils"
import { useBlock } from "./useBlock"
import { useDeFiat } from "./useDeFiat"

interface PoolData {
  pendingRewards:BigNumber;
  tokenBalance:BigNumber;
  stakedBalance:BigNumber;
}

export const usePool = () => {
  const [data, setData] = useState<PoolData>()
  
  const {
    account,
    ethereum,
    chainId
  }: { account: string; ethereum: provider, chainId: number } = useWallet()
  const block = useBlock()
  const DeFiat = useDeFiat()
  
  // const SecondChance = useMemo(() => getSecondContract(DeFiat), [DeFiat])
  const RugSanctuary = useMemo(() => getRugSanctuaryContract(DeFiat), [DeFiat])

  const handleClaim = useCallback(async () => {

  }, [])

  const handleDeposit = useCallback(async (deposit:string) => {

  }, [])

  const handleWithdraw = useCallback(async (withdraw:string) => {

  }, [])

  const fetchData = useCallback(async () => {
    const values = await Promise.all([
      getBalance(Addresses.SecondLp[chainId], account, ethereum),
      stakedPool(RugSanctuary, account),
      pendingPool(RugSanctuary, account),
    ])

    setData({
      tokenBalance: values[0],
      stakedBalance: values[1],
      pendingRewards: values[2]
    })
  }, [account, chainId, ethereum, RugSanctuary])


  useEffect(() => {
    if (!!account && !!DeFiat) {
      fetchData()
    }
  }, [account, block, DeFiat, fetchData])

  return {
    data,
    claim: handleClaim,
    deposit: handleDeposit,
    withdraw: handleWithdraw,
  }
}