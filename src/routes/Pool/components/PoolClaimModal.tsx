import { Button, CircularProgress, Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import { Modal, ModalProps } from "components/Modal";
import { Pools } from "constants/pools";
import { useNotifications } from "hooks/useNotifications";
import { usePool } from "hooks/usePool";
import React, { useCallback, useState } from "react";
import { useWallet } from "use-wallet";
import { getDisplayBalance } from "utils";

interface PoolClaimModalProps extends ModalProps {
  pid: number;
}

export const PoolClaimModal: React.FC<PoolClaimModalProps> = ({
  pid,
  isOpen,
  onDismiss,
}) => {
  const { chainId } = useWallet();
  // const { pid } = useParams<{ pid: string }>();
  const { symbol, address, decimals } = Pools[chainId][pid];

  const notify = useNotifications();
  const { data, claim } = usePool(+pid);

  const [isTransacting, setIsTransacting] = useState<boolean>(false);
  const handleClaim = useCallback(async () => {
    setIsTransacting(true);
    try {
      const txHash = await claim(+pid);
      if (!!txHash) {
        notify(
          `Claimed DFT rewards from AnyStake ${symbol} Pool.`,
          "success",
          txHash,
          chainId
        );
      }
    } catch {
      notify(
        `Encountered an error while claiming DFT rewards from Regulator for ${symbol} Pool.`,
        "error"
      );
    }
    setIsTransacting(false);
  }, [chainId, pid, symbol, claim, notify]);

  return (
    <Modal
      fullWidth
      maxWidth="sm"
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      title={`Claim DFT Rewards from ${symbol} Pool`}
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
