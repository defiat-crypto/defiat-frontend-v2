import BigNumber from "bignumber.js";
import {
  claimRegulator,
  depositRegulator,
  getPointsAddress,
  getRegulatorContract,
  withdrawRegulator,
  totalStakedRegulator,
  getDeFiatAddress,
  multiplierRegulator,
  stakedRegulator,
  getRegulatorApr,
  getVaultContract,
  buybackRegulator,
  isAbovePeg,
  getVaultPrice,
  getCircleAddress,
  getCircleLpAddress,
  getPointsLpAddress,
  getDeFiatLpAddress,
  pendingVirtualRegulator,
  getVaultV2Contract,
} from "defiat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { getBalance } from "utils";
import { provider } from "web3-core";
import { useBlock } from "./useBlock";
import { useDeFiat } from "./useDeFiat";

interface RegulatorData {
  totalLocked: BigNumber;
  totalValueLocked: BigNumber;
  pointsPrice: BigNumber;
  tokenPrice: BigNumber;
  peg: number;
  ratio: BigNumber;
  pendingRewards: BigNumber;
  tokenBalance: BigNumber;
  stakedBalance: BigNumber;
  apr: string;
  buybackBalance: BigNumber;
  isAbovePeg: boolean;
}

export const useRegulator = () => {
  const [data, setData] = useState<RegulatorData>();

  const {
    account,
    chainId,
    ethereum
  }: { account: string; chainId: number, ethereum: provider } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();

  const Regulator = useMemo(() => getRegulatorContract(DeFiat), [DeFiat]);
  const Vault = useMemo(() => getVaultV2Contract(DeFiat), [DeFiat]);

  const handleClaim = useCallback(async () => {
    const txHash = await claimRegulator(Regulator, account);
    return txHash;
  }, [account, Regulator]);

  const handleDeposit = useCallback(
    async (deposit: string) => {
      const txHash = await depositRegulator(Regulator, account, deposit);
      return txHash;
    },
    [account, Regulator]
  );

  const handleWithdraw = useCallback(
    async (withdraw: string) => {
      const txHash = await withdrawRegulator(Regulator, account, withdraw);
      return txHash;
    },
    [account, Regulator]
  );

  const getData = useCallback(async () => {
    const values = await Promise.all([
      getBalance(getPointsAddress(DeFiat), account, ethereum),
      totalStakedRegulator(Regulator),
      multiplierRegulator(Regulator),
      stakedRegulator(Regulator, account),
      getRegulatorApr(DeFiat, Vault, Regulator),
      buybackRegulator(Regulator),
      isAbovePeg(Regulator),
      pendingVirtualRegulator(Regulator, Vault, DeFiat, chainId, ethereum, block, account),
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
      getVaultPrice(
        Vault,
        getCircleAddress(DeFiat),
        getCircleLpAddress(DeFiat)
      ),
    ]);

    const tokenBalance = values[0];
    const totalLocked = values[1];
    const peg = +values[2] / 1000;
    const stakedBalance = values[3];
    const apr = values[4].div(1e18).decimalPlaces(2).toString();
    const buybackBalance = values[5];
    const abovePeg = values[6];
    const pending = new BigNumber(values[7]);
    const pointsPrice = values[8].times(1e18).div(values[10]);
    const tokenPrice = values[9].times(1e18).div(values[10]);
    const totalValueLocked = pointsPrice.times(totalLocked).div(1e18);
    const ratio = tokenPrice.div(pointsPrice);

    setData({
      totalLocked,
      totalValueLocked,
      pointsPrice,
      tokenPrice,
      tokenBalance,
      peg,
      ratio,
      pendingRewards: pending,
      stakedBalance,
      apr: apr,
      buybackBalance,
      isAbovePeg: abovePeg,
    });
  }, [account, ethereum, DeFiat, Vault, Regulator, block, chainId]);

  useEffect(() => {
    if (!!account && !!DeFiat) {
      getData();
    }
  }, [account, block, DeFiat, getData]);

  return {
    data,
    claim: handleClaim,
    deposit: handleDeposit,
    withdraw: handleWithdraw,
  };
};
