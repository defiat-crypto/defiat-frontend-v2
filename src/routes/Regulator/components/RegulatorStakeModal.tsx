import { Button, TextField, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import { MaxInputAdornment } from "components/MaxInputAdornment";
import { Modal, ModalProps } from "components/Modal";
import { BigNumber, getAnyStakeAddress, getPointsAddress } from "defiat";
import { useApprove } from "hooks/useApprove";
import { useDeFiat } from "hooks/useDeFiat";
import { useNotifications } from "hooks/useNotifications";
import { useRegulator } from "hooks/useRegulator";
import React, { useCallback, useState } from "react";
import { getFullDisplayBalance } from "utils";

export const RegulatorStakeModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {
  const notify = useNotifications();
  const DeFiat = useDeFiat();
  const { data, deposit, withdraw } = useRegulator();
  const { approve, allowance } = useApprove(
    getPointsAddress(DeFiat),
    getAnyStakeAddress(DeFiat)
  );

  const [depositInput, setDepositInput] = useState<string>();
  const [withdrawInput, setWithdrawInput] = useState<string>();

  const handleDeposit = useCallback(async () => {
    if (allowance.eq(0)) {
      const approveTxHash = await approve();
      if (!!approveTxHash) {
        notify("Approved DFTPv2 Regulator staking.", "success", approveTxHash);
      } else {
        notify("Encountered an error while approving DFTPv2.", "error");
      }
    }

    const txHash = await deposit(
      new BigNumber(depositInput).times(1e18).toString()
    );
    if (!!txHash) {
      notify("Deposited DFTPv2 into the Regulator.", "success", txHash);
      setDepositInput("");
    } else {
      notify(
        "Encountered an error while depositing DFTPv2 into the Regulator",
        "error"
      );
    }
  }, [allowance, approve, depositInput, notify, deposit]);

  const handleWithdraw = useCallback(async () => {
    const txHash = await withdraw(
      new BigNumber(withdrawInput).times(1e18).toString()
    );
    if (!!txHash) {
      notify("Withdrew DFTPv2 from the Regulator.", "success", txHash);
      setWithdrawInput("");
    } else {
      notify(
        "Encountered an error while withdrawing DFTPv2 from the Regulator.",
        "error"
      );
    }
  }, [withdrawInput, notify, withdraw]);

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
              <b>{data ? data.tokenBalance : "0.00"}</b>
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
                  setDepositInput(
                    getFullDisplayBalance(new BigNumber(data.tokenBalance))
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
              new BigNumber(data.tokenBalance).eq(0) ||
              !depositInput ||
              new BigNumber(depositInput).eq(0)
            }
          >
            Stake DFTPv2
          </Button>
        </Flex>
      </Flex>

      <Flex mb={2} column>
        <Flex align="flex-end" justify="space-between" mb={1}>
          <Typography variant="h5">Staked Balance</Typography>
          <Flex align="flex-end">
            <Typography variant="h5" align="right">
              <b>{data ? data.stakedBalance : "0.00"}</b>
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
                  setDepositInput(
                    getFullDisplayBalance(new BigNumber(data.stakedBalance))
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
              new BigNumber(data.stakedBalance).eq(0) ||
              !withdrawInput ||
              new BigNumber(withdrawInput).eq(0)
            }
          >
            Unstake DFTPv2
          </Button>
        </Flex>
      </Flex>
      <Flex mt={2} column>
        <Typography variant="h6" gutterBottom align="center">
          <b>Unstaking DFTPv2 incurs a 10% fee to Regulate DFTPv2:DFT Peg</b>
        </Typography>
        <Typography align="center">
          Staking / Unstaking automatically claim pending rewards
        </Typography>
      </Flex>
    </Modal>
  );
};
