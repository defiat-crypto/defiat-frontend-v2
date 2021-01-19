import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, ButtonProps, makeStyles } from '@material-ui/core'
import { useModal } from '../../hooks/useModal'
import { useWallet } from 'use-wallet'
import { formatAddress } from '../../utils'
// import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { Web3ConnectModal } from '../Web3ConnectModal'

const useStyles = makeStyles((theme) => ({
  label: {
    textTransform: 'none'
  }
}))

export const Web3ConnectButton: React.FC<ButtonProps> = ({...props}) => {
  const classes = useStyles()
  const history = useHistory()
  const [showConnectModal] = useModal(<Web3ConnectModal />)
  const { account } = useWallet()

  return (
    <Button
      color="inherit"
      variant="outlined"
      classes={{label: classes.label}}
      onClick={!!account 
        ? () => history.push('/account')
        : showConnectModal
      }
      // startIcon={!!account
      //   ? <Avatar size={20} />
      //   : <AccountBalanceWalletIcon />
      // }
      {...props}
    >
      {!!account 
        ? formatAddress(account) 
        : "CONNECT"
      }
    </Button>
  )
}
