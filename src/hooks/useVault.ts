import addresses from "constants/addresses";
import {
  BigNumber,
  getAnyStakeContract,
  getBondedRewards,
  getDeFiatAddress,
  getDeFiatContract,
  getIncomingRewardsVault,
  getOracle,
  getPendingRewardsVault,
  getRegulatorContract,
  getTetherAddress,
  getTokenPrice,
  getVaultContract,
} from "defiat";
import { ProcessedRewards } from "defiat/lib/processedRewards";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { getBalance } from "utils";
import { provider } from "web3-core";
import { useBlock } from "./useBlock";
import { useDeFiat } from "./useDeFiat";

interface VaultData {
  tokenPrice: BigNumber;
  totalValueLocked: BigNumber;
  bondedRewards: BigNumber;
  getIncomingRewardsVault: ProcessedRewards[];
  balanceChange: BigNumber;
  pendingRewards: BigNumber;
}

export const useVault = () => {
  const [data, setData] = useState<VaultData>();
  const {
    account,
    chainId,
    ethereum,
  }: { account: string; chainId: number; ethereum: provider } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();
  const Oracle = useMemo(() => getOracle(DeFiat), [DeFiat]);
  const Vault = useMemo(() => getVaultContract(DeFiat), [DeFiat]);
  const AnyStake = useMemo(() => getAnyStakeContract(DeFiat), [DeFiat]);
  const Regulator = useMemo(() => getRegulatorContract(DeFiat), [DeFiat]);
  const Token = useMemo(() => getDeFiatContract(DeFiat), [DeFiat]);

  const getData = useCallback(async () => {
    const values = await Promise.all([
      getTokenPrice(Oracle, getDeFiatAddress(DeFiat)),
      getTokenPrice(Oracle, getTetherAddress(DeFiat)),
      getBalance(getDeFiatAddress(DeFiat), addresses.Vault[chainId], ethereum),
      getBondedRewards(Vault),
      getIncomingRewardsVault(
        DeFiat,
        Token,
        Vault,
        AnyStake,
        Regulator,
        chainId,
        block
      ),
      getPendingRewardsVault(Vault),
    ]);

    const tokenPrice = values[1].dividedBy(values[0]);
    const totalValueLocked = tokenPrice.multipliedBy(values[2]);
    const incomingRewardsVault = values[4];
    let change: BigNumber = new BigNumber("0");

    incomingRewardsVault.forEach((reward) => {
      if (reward.direction === "In") {
        change = change.plus(reward.amountDFT);
      } else {
        change = change.minus(reward.amountDFT);
      }
    });
    setData({
      tokenPrice: tokenPrice.multipliedBy(1e18),
      totalValueLocked: totalValueLocked,
      bondedRewards: values[3],
      getIncomingRewardsVault: incomingRewardsVault,
      balanceChange: change,
      pendingRewards: values[5],
    });
  }, [
    ethereum,
    DeFiat,
    Oracle,
    Vault,
    AnyStake,
    Regulator,
    block,
    Token,
    chainId,
  ]);

  useEffect(() => {
    if (!!account && !!DeFiat) {
      getData();
    }
  }, [account, block, DeFiat, getData]);

  return {
    data,
  };
};
