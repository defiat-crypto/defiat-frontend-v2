import { Button } from "@material-ui/core";
import { useSnackbar, VariantType } from "notistack";
import { Fragment } from "react";
import { useWallet } from "use-wallet";
import { getEtherscanTransaction } from "utils/address";
import { TransactionReceipt } from "web3-core";

export const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { chainId } = useWallet();

  const notify = (
    message: string,
    variant: VariantType,
    txHash?: TransactionReceipt,
    chainId?: number
  ) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 6000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      action: (key) => (
        <Fragment>
          {txHash && (
            <Button
              href={getEtherscanTransaction(chainId, txHash.transactionHash)}
              target="_blank"
              rel="noopener,noreferrer"
            >
              View
            </Button>
          )}
          <Button onClick={() => closeSnackbar(key)}>Dismiss</Button>
        </Fragment>
      ),
    });
  };

  return notify;
};
