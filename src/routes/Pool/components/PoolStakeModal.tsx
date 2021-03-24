import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Flex } from "components/Flex";
import { MaxInputAdornment } from "components/MaxInputAdornment";
import { Modal, ModalProps } from "components/Modal";
import { Pools } from "constants/pools";
import { BigNumber, getAnyStakeAddress } from "defiat";
import { useApprove } from "hooks/useApprove";
import { useDeFiat } from "hooks/useDeFiat";
import { useNotifications } from "hooks/useNotifications";
import { usePool } from "hooks/usePool";
import React, { useCallback, useState } from "react";
import { useWallet } from "use-wallet";
import { getDisplayBalance, getFullDisplayBalance } from "utils";

interface PoolStakeModalProps extends ModalProps {
  pid: number;
}

export const PoolStakeModal: React.FC<PoolStakeModalProps> = ({
  pid,
  isOpen,
  onDismiss,
}) => {
  const { chainId } = useWallet();
  const { symbol, address, decimals } = Pools[chainId][pid];
  const symbolVIP = Pools[chainId][0]["symbol"];
  const notify = useNotifications();
  const DeFiat = useDeFiat();
  const { data, deposit, withdraw } = usePool(pid);
  const { approve, allowance } = useApprove(
    address,
    getAnyStakeAddress(DeFiat)
  );

  const [depositInput, setDepositInput] = useState<string>();
  const [withdrawInput, setWithdrawInput] = useState<string>();
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const handleDeposit = useCallback(async () => {
    if (allowance.eq(0)) {
      setIsDepositing(true);
      try {
        const approveTxHash = await approve();
        if (!!approveTxHash) {
          notify(
            `Approve ${symbol} AnyStake staking.`,
            "success",
            approveTxHash,
            chainId
          );
        }
      } catch {
        notify(`Encountered an error while approving ${symbol}.`, "error");
      }
      setIsDepositing(false);
    }

    setIsDepositing(true);
    try {
      const txHash = await deposit(
        new BigNumber(depositInput)
          .times(new BigNumber(10).pow(decimals))
          .toString()
      );
      if (!!txHash) {
        notify(
          `Deposited ${symbol} into AnyStake.`,
          "success",
          txHash,
          chainId
        );
        setDepositInput("");
      }
    } catch {
      notify(
        `Encountered an error while depositing ${symbol} into AnyStake`,
        "error"
      );
    }
    setIsDepositing(false);
  }, [
    allowance,
    chainId,
    decimals,
    depositInput,
    symbol,
    approve,
    notify,
    deposit,
  ]);

  const handleWithdraw = useCallback(async () => {
    setIsWithdrawing(true);
    try {
      const txHash = await withdraw(
        new BigNumber(withdrawInput)
          .times(new BigNumber(10).pow(decimals))
          .toString()
      );
      if (!!txHash) {
        notify(`Withdrew ${symbol} from AnyStake.`, "success", txHash, chainId);
        setWithdrawInput("");
      }
    } catch {
      notify(
        `Encountered an error while withdrawing ${symbol} from AnyStake.`,
        "error"
      );
    }

    setIsWithdrawing(false);
  }, [symbol, chainId, decimals, withdrawInput, notify, withdraw]);

  return (
    <Modal
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      title={`Stake / Unstake ${symbol}`}
    >

      {data?.vipAmountUser.isLessThan(data.vipAmount) ?
        <Flex mb={2} column>
          <Flex align="flex-end" justify="space-between" mb={1}>
            <Typography variant="h5">VIP Balance</Typography>
            <Flex align="flex-end">
              <Typography variant="h5" align="right">
                <b>
                  {data ? getDisplayBalance(data.vipAmountUser, 18) : "0.00"}
                </b>
              </Typography>
              <Typography variant="body1" align="right">
                &nbsp;{symbolVIP}
              </Typography>
            </Flex>
          </Flex>
          <Flex mt={1}>
            VIP Pool: {data ? getDisplayBalance(data.vipAmount) : "0.00"} DFT Stake Required to
          Enter
          </Flex>
        </Flex>
        : ""}
      <Flex mb={2} column>
        <Flex align="flex-end" justify="space-between" mb={1}>
          <Typography variant="h5">Wallet Balance</Typography>
          <Flex align="flex-end">
            <Typography variant="h5" align="right">
              <b>
                {data ? getDisplayBalance(data.tokenBalance, decimals) : "0.00"}
              </b>
            </Typography>
            <Typography variant="body1" align="right">
              &nbsp;{symbol}
            </Typography>
          </Flex>
        </Flex>
        <TextField
          value={depositInput}
          onChange={(e) => setDepositInput(e.target.value)}
          type="number"
          placeholder={`Stake ${symbol}`}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <MaxInputAdornment
                onClick={() =>
                  setDepositInput(
                    getFullDisplayBalance(data.tokenBalance, decimals)
                  )
                }
              />
            ),
          }}
        />
        <Flex mt={1}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleDeposit}
            disabled={
              !data ||
              isDepositing ||
              isWithdrawing ||
              data.tokenBalance.eq(0) ||
              (data.vipAmount.isGreaterThan(0) && data.vipAmountUser.isLessThan(data.vipAmount)) ||
              !depositInput ||
              new BigNumber(depositInput).lte(0) ||
              new BigNumber(depositInput)
                .times(new BigNumber(10).pow(decimals))
                .gt(data.tokenBalance)
            }
          >
            Stake {symbol}
            {isDepositing && (
              <CircularProgress
                size={16}
                style={{ marginLeft: "4px" }}
                color="inherit"
              />
            )}
          </Button>
        </Flex>
      </Flex>

      <Flex mb={2} column>
        <Flex align="flex-end" justify="space-between" mb={1}>
          <Typography variant="h5">Staked Balance</Typography>
          <Flex align="flex-end">
            <Typography variant="h5" align="right">
              <b>
                {data
                  ? getDisplayBalance(data.stakedBalance, decimals)
                  : "0.00"}
              </b>
            </Typography>
            <Typography variant="body1" align="right">
              &nbsp;{symbol}
            </Typography>
          </Flex>
        </Flex>
        <TextField
          value={withdrawInput}
          onChange={(e) => setWithdrawInput(e.target.value)}
          type="number"
          placeholder={`Unstake ${symbol}`}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <MaxInputAdornment
                onClick={() =>
                  setWithdrawInput(
                    getFullDisplayBalance(data.stakedBalance, decimals)
                  )
                }
              />
            ),
          }}
        />
        <Flex mt={1}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleWithdraw}
            disabled={
              !data ||
              isDepositing ||
              isWithdrawing ||
              data.stakedBalance.eq(0) ||
              (data.vipAmount.isGreaterThan(0) && data.vipAmountUser.isLessThan(data.vipAmount)) ||
              !withdrawInput ||
              new BigNumber(withdrawInput).lte(0) ||
              new BigNumber(withdrawInput)
                .times(new BigNumber(10).pow(decimals))
                .gt(data.stakedBalance)
            }
          >
            Unstake {symbol}
            {isWithdrawing && (
              <CircularProgress
                size={16}
                style={{ marginLeft: "4px" }}
                color="inherit"
              />
            )}
          </Button>
        </Flex>
      </Flex>
      <Flex mt={2} column>
        {data && data.stakingFee && (
          <Typography variant="h6" gutterBottom align="center">
            <b>
              Unstaking {symbol} incurs a {data.stakingFee}% fee to buyback DFT
            </b>
          </Typography>
        )}
        <Typography align="center">
          Staking / Unstaking automatically claim pending rewards
        </Typography>
      </Flex>
    </Modal>
  );
};
