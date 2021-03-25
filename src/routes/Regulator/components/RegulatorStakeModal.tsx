import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Flex } from "components/Flex";
import { MaxInputAdornment } from "components/MaxInputAdornment";
import { Modal, ModalProps } from "components/Modal";
import { BigNumber, getPointsAddress, getRegulatorAddress } from "defiat";
import { useApprove } from "hooks/useApprove";
import { useDeFiat } from "hooks/useDeFiat";
import { useNotifications } from "hooks/useNotifications";
import { useRegulator } from "hooks/useRegulator";
import React, { useCallback, useState } from "react";
import { useWallet } from "use-wallet";
import { getDisplayBalance, getFullDisplayBalance } from "utils";

export const RegulatorStakeModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {
  const notify = useNotifications();
  const DeFiat = useDeFiat();
  const { chainId } = useWallet();
  const { data, deposit, withdraw } = useRegulator();
  const { approve, allowance } = useApprove(
    getPointsAddress(DeFiat),
    getRegulatorAddress(DeFiat)
  );
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const [depositInput, setDepositInput] = useState<string>();
  const [withdrawInput, setWithdrawInput] = useState<string>();

  const handleDeposit = useCallback(async () => {
    if (allowance.eq(0)) {
      setIsDepositing(true);
      try {
        const approveTxHash = await approve();

        if (!!approveTxHash) {
          notify(
            "Approved DFTPv2 Regulator staking.",
            "success",
            approveTxHash,
            chainId
          );
        }
      } catch {
        notify("Encountered an error while approving DFTPv2.", "error");
      }
      setIsDepositing(false);
    }
    setIsDepositing(true);
    try {
      const txHash = await deposit(
        new BigNumber(depositInput).times(1e18).toString()
      );

      if (!!txHash) {
        notify(
          "Deposited DFTPv2 into the Regulator.",
          "success",
          txHash,
          chainId
        );
        setDepositInput("");
      }
    } catch {
      notify(
        "Encountered an error while depositing DFTPv2 into the Regulator",
        "error"
      );
    }
    setIsDepositing(false);
  }, [allowance, chainId, approve, depositInput, notify, deposit]);

  const handleWithdraw = useCallback(async () => {
    setIsWithdrawing(true);
    try {
      const txHash = await withdraw(
        new BigNumber(withdrawInput).times(1e18).toString()
      );
      if (!!txHash) {
        notify(
          "Withdrew DFTPv2 from the Regulator.",
          "success",
          txHash,
          chainId
        );
        setWithdrawInput("");
      }
    } catch {
      notify(
        "Encountered an error while withdrawing DFTPv2 from the Regulator.",
        "error"
      );
    }
    setIsWithdrawing(false);
  }, [chainId, withdrawInput, notify, withdraw]);

  return (
    <Modal
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      title="Stake / Unstake DFTPv2"
    >
      <Flex mb={2} column>
        <Flex align="flex-end" justify="space-between" mb={1}>
          <Typography variant="h5">Wallet Balance</Typography>
          <Flex align="flex-end">
            <Typography variant="h5" align="right">
              <b>{data ? getDisplayBalance(data.tokenBalance) : "0.00"}</b>
            </Typography>
            <Typography variant="body1" align="right">
              &nbsp;DFTPv2
            </Typography>
          </Flex>
        </Flex>
        <TextField
          value={depositInput}
          onChange={(e) => setDepositInput(e.target.value)}
          type="number"
          placeholder="Stake DFTPv2"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <MaxInputAdornment
                onClick={() =>
                  setDepositInput(getFullDisplayBalance(data.tokenBalance))
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
              !depositInput ||
              new BigNumber(depositInput).lte(0) ||
              new BigNumber(depositInput).times(1e18).gt(data.tokenBalance)
            }
          >
            {allowance?.eq(0) ? 'Approve' : 'Stake'} DFTPv2
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
              <b>{data ? getDisplayBalance(data.stakedBalance) : "0.00"}</b>
            </Typography>
            <Typography variant="body1" align="right">
              &nbsp;DFTPv2
            </Typography>
          </Flex>
        </Flex>
        <TextField
          value={withdrawInput}
          onChange={(e) => setWithdrawInput(e.target.value)}
          type="number"
          placeholder="Unstake DFTPv2"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <MaxInputAdornment
                onClick={() =>
                  setWithdrawInput(getFullDisplayBalance(data.stakedBalance))
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
              isWithdrawing ||
              isDepositing ||
              data.stakedBalance.eq(0) ||
              !withdrawInput ||
              new BigNumber(withdrawInput).lte(0) ||
              new BigNumber(withdrawInput).times(1e18).gt(data.stakedBalance)
            }
          >
            Unstake DFTPv2
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
        <Typography variant="h6" gutterBottom align="center">
          <b>Unstaking DFTPv2 incurs a 10% fee to Regulate DFTPv2:DFT Peg</b>
        </Typography>
        {data && !data.isAbovePeg && (
          <Typography variant="h6" gutterBottom align="center">
            The buyback balance of {getDisplayBalance(data.buybackBalance)}DFT will be used to buy DFTPv2
          </Typography>
        )}
        <Typography align="center">
          Staking / Unstaking automatically claim pending rewards
        </Typography>
      </Flex>
    </Modal>
  );
};
