import { useCallback, useEffect, useMemo, useState } from "react"
import { useWallet } from "use-wallet"
import { provider } from "web3-core"
import Addresses from "../constants/addresses"
import { getRugSanctuaryContract, stakedPool, pendingPool, BigNumber, withdrawPool, depositPool } from "../defiat"
import { getBalance } from "../utils"
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
  
  const RugSanctuary = useMemo(() => getRugSanctuaryContract(DeFiat), [DeFiat])

  const handleClaim = useCallback(async () => {
    const txHash = await withdrawPool(RugSanctuary, account, '0')
    return txHash
  }, [account, RugSanctuary])

  const handleDeposit = useCallback(async (deposit:string) => {
    const txHash = await depositPool(RugSanctuary, account, deposit)
    return txHash
  }, [account, RugSanctuary])

  const handleWithdraw = useCallback(async (withdraw:string) => {
    const txHash = await withdrawPool(RugSanctuary, account, withdraw)
    return txHash
  }, [account, RugSanctuary])

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