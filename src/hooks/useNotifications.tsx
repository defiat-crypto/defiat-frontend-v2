import { Button } from '@material-ui/core'
import { useSnackbar, VariantType } from 'notistack';
import React, { Fragment } from 'react'

export const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const notify = (message:string, variant:VariantType, txHash?:string) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 6000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      action: (key) => {
        <Fragment>
          {!!txHash && 
            <Button
              href={`https://etherscan.io/tx/${txHash}`}
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
