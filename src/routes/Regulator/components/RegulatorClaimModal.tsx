import { Button, CircularProgress, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import { Modal, ModalProps } from "components/Modal";
import { useNotifications } from "hooks/useNotifications";
import { useRegulator } from "hooks/useRegulator";
import React, { useCallback, useState } from "react";
import { useWallet } from "use-wallet";
import { getDisplayBalance } from "utils";

export const RegulatorClaimModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {
  const notify = useNotifications();
  const { data, claim } = useRegulator();
  const { chainId } = useWallet();
  const [isTransacting, setIsTransacting] = useState<boolean>(false);
  const handleClaim = useCallback(async () => {
    setIsTransacting(true);
    try {
      const txHash = await claim();
      if (!!txHash) {
        notify(
          "Claimed DFT rewards from Regulator.",
          "success",
          txHash,
          chainId
        );
      }
    } catch {
      notify(
        "Encountered an error while claiming DFT rewards from Regulator.",
        "error"
      );
    }
    setIsTransacting(false);
  }, [chainId, claim, notify]);

  return (
    <Modal
      fullWidth
      maxWidth="sm"
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      title="Claim DFT Rewards"
    >
      <Flex mb={2} column>
        <Flex align="flex-end" justify="space-between" mb={1}>
          <Typography variant="h5">Pending Rewards</Typography>
          <Flex align="flex-end">
            <Typography variant="h5" align="right">
              <b>{data ? getDisplayBalance(data.pendingRewards) : "0.00"}</b>
            </Typography>
            <Typography variant="body1" align="right">
              &nbsp;DFT
            </Typography>
          </Flex>
        </Flex>
        <Flex mt={1}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClaim}
            disabled={!data || data.stakedBalance.eq(0) || isTransacting}
          >
            Claim Rewards
            {isTransacting && (
              <CircularProgress
                size={16}
                style={{ marginLeft: "4px" }}
                color="inherit"
              />
            )}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
