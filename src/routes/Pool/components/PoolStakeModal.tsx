import { Button, TextField, Typography } from "@material-ui/core";
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
import { getFullDisplayBalance } from "utils";

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

  const notify = useNotifications();
  const DeFiat = useDeFiat();
  const { data, deposit, withdraw } = usePool(pid);
  const { approve, allowance } = useApprove(
    address,
    getAnyStakeAddress(DeFiat)
  );

  const [depositInput, setDepositInput] = useState<string>();
  const [withdrawInput, setWithdrawInput] = useState<string>();

  const handleDeposit = useCallback(async () => {
    if (allowance.eq(0)) {
      const approveTxHash = await approve();
      if (!!approveTxHash) {
        notify(`Approve ${symbol} AnyStake staking.`, "success", approveTxHash);
      } else {
        notify(`Encountered an error while approving ${symbol}.`, "error");
      }
    }

    const txHash = await deposit(
      new BigNumber(depositInput).times(1e18).toString()
    );
    if (!!txHash) {
      notify(`Deposited ${symbol} into AnyStake.`, "success", txHash);
      setDepositInput("");
    } else {
      notify(
        `Encountered an error while depositing ${symbol} into AnyStake`,
        "error"
      );
    }
  }, [allowance, depositInput, symbol, approve, notify, deposit]);

  const handleWithdraw = useCallback(async () => {
    const txHash = await withdraw(
      new BigNumber(withdrawInput).times(1e18).toString()
    );
    if (!!txHash) {
      notify(`Withdrew ${symbol} from AnyStake.`, "success", txHash);
      setWithdrawInput("");
    } else {
      notify(
        `Encountered an error while withdrawing ${symbol} from AnyStake.`,
        "error"
      );
    }
  }, [symbol, withdrawInput, notify, withdraw]);

  return (
    <Modal
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      title={`Stake / Unstake ${symbol}`}
    >
      <Flex mb={2} column>
        <Flex align="flex-end" justify="space-between" mb={1}>
          <Typography variant="h5">Wallet Balance</Typography>
          <Flex align="flex-end">
            <Typography variant="h5" align="right">
              <b>{data ? data.tokenBalance : "0.00"}</b>
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
          placeholder="Stake 2ND/ETH UNI-V2"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <MaxInputAdornment
                onClick={() =>
                  setDepositInput(
                    getFullDisplayBalance(
                      new BigNumber(data.tokenBalance),
                      decimals
                    )
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
            Stake {symbol}
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
              &nbsp;{symbol}
            </Typography>
          </Flex>
        </Flex>
        <TextField
          value={withdrawInput}
          onChange={(e) => setWithdrawInput(e.target.value)}
          type="number"
          placeholder="Unstake 2ND/ETH UNI-V2"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <MaxInputAdornment
                onClick={() =>
                  setDepositInput(
                    getFullDisplayBalance(
                      new BigNumber(data.stakedBalance),
                      decimals
                    )
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
            Unstake {symbol}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
