import { Button, Typography } from "@material-ui/core";
import BigNumber from "bignumber.js";
import { Flex } from "components/Flex";
import { Modal, ModalProps } from "components/Modal";
import { useNotifications } from "hooks/useNotifications";
import { useRegulator } from "hooks/useRegulator";
import React, { useCallback } from "react";
import { getDisplayBalance } from "utils";

export const RegulatorClaimModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {
  const notify = useNotifications();
  const { data, claim } = useRegulator();

  const handleClaim = useCallback(async () => {
    const txHash = await claim();
    if (!!txHash) {
      notify("Claimed DFT rewards from Regulator.", "success", txHash);
    } else {
      notify(
        "Encountered an error while claiming DFT rewards from Regulator.",
        "error"
      );
    }
  }, [claim, notify]);

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
              <b>
                {data
                  ? getDisplayBalance(new BigNumber(data.pendingRewards))
                  : "0.00"}
              </b>
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
            disabled={!data || new BigNumber(data.pendingRewards).eq(0)}
          >
            Claim Rewards
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
