import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import MetamaskLogo from '../../assets/img/metamask.svg'
import WalletConnectLogo from '../../assets/img/walletconnect.svg'
import { Web3ProviderButton } from './components/Web3ProviderButton'
import { useWallet } from 'use-wallet'
import { Modal, ModalProps } from '../Modal'

export const Web3ConnectModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss
}) => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (account && onDismiss) {
      onDismiss()
    }
  }, [account, onDismiss])

  return (
    <Modal isOpen={!!isOpen} onDismiss={onDismiss} fullWidth title="Connect To Ethereum">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Web3ProviderButton
            image={MetamaskLogo}
            providerName="Metamask"
            onClick={() => {
              connect('injected');
              localStorage.setItem('web3', 'injected');
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Web3ProviderButton
            image={WalletConnectLogo}
            providerName="WalletConnect"
            onClick={() => {
              connect('walletconnect');
              localStorage.setItem('web3', 'walletconnect');
            }}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}
