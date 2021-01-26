import { Button } from '@material-ui/core'
import { useSnackbar, VariantType } from 'notistack';
import React, { Fragment } from 'react'
import { TransactionReceipt } from 'web3-core';

export const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const notify = (message:string, variant:VariantType, txHash?:TransactionReceipt) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 6000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      action: (key) => {
        <Fragment>
          {txHash && 
            <Button
              href={`https://etherscan.io/tx/${txHash.blockHash}`}
              target="_blank"
              rel="noopener,noreferrer"
            >
              View
            </Button>
          }
          <Button
            onClick={() => closeSnackbar(key)}
          >
            Dismiss
          </Button>
        </Fragment>
      }
    })
  }

  return notify
}
