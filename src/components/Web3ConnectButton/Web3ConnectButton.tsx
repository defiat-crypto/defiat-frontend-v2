import React from 'react'
import { Button, ButtonProps, makeStyles } from '@material-ui/core'
import { useModal } from '../../hooks/useModal'
import { useWallet } from 'use-wallet'
import { formatAddress } from '../../utils'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { Web3ConnectModal } from '../Web3ConnectModal'

interface Web3ConnectButtonProps extends ButtonProps {
  useWalletIcon?: boolean
}

const useStyles = makeStyles((theme) => ({
  label: {
    textTransform: 'none'
  }
}))

export const Web3ConnectButton: React.FC<Web3ConnectButtonProps> = ({
  useWalletIcon,
  ...props
}) => {
  const classes = useStyles()
  const [showConnectModal] = useModal(<Web3ConnectModal />)
  const { account, reset, connect, status } = useWallet()

  if (!account && status === 'disconnected') {
    const web3 = localStorage.getItem('web3');
    if (web3 === 'injected')
      connect('injected');
    else if (web3 === 'walletconnect')
      connect('walletconnect');
  }
  return (
    <Button
      color="inherit"
      variant="outlined"
      classes={{ label: classes.label }}
      onClick={!!account
        ? () => {
          localStorage.removeItem('web3');
          reset();
        }
        : showConnectModal
      }
      startIcon={useWalletIcon
        ? <AccountBalanceWalletIcon />
        : undefined
      }
      {...props}
    >
      {!!account
        ? formatAddress(account)
        : "CONNECT"
      }
    </Button>
  )
}
