import { Button, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { Flex } from "components/Flex";
import { Modal, ModalProps } from "components/Modal";
import { useNotifications } from "hooks/useNotifications";
import { useSecondPool } from "hooks/useSecondPool";
import { getDisplayBalance } from "utils";

export const SanctuaryPoolClaimModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {
  const notify = useNotifications();
  const { data, claim } = useSecondPool();

  const handleClaim = useCallback(async () => {
    const txHash = await claim();
    if (!!txHash) {
      notify("Claiming 2ND rewards from Sanctuary...", "success", txHash);
    } else {
      notify("Encountered an error while claiming 2ND rewards.", "error");
    }
  }, [claim, notify]);

  return (
    <Modal
      fullWidth
      maxWidth="sm"
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      title="Claim 2ND Rewards"
    >
      <Flex mb={2} column>
        <Flex align="flex-end" justify="space-between" mb={1}>
          <Typography variant="h5">Pending Rewards</Typography>
          <Flex align="flex-end">
            <Typography variant="h5" align="right">
              <b>{data ? getDisplayBalance(data.pendingRewards) : "0.00"}</b>
            </Typography>
            <Typography variant="body1" align="right">
              &nbsp;2ND
            </Typography>
          </Flex>
        </Flex>
        <Flex mt={1}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClaim}
            disabled={!data || data.pendingRewards.eq(0)}
          >
            Claim Rewards
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
