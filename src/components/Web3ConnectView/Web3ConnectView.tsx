import React from 'react'
import { Flex } from '../Flex'
// import LoadingScales from '../../assets/img/LoadingFarm.gif'
import { Box, Typography } from '@material-ui/core'
import { Web3ConnectButton } from '../Web3ConnectButton'
import { useWallet } from 'use-wallet'
import treasury256 from '../../assets/img/treasury256.png'

export const Web3ConnectView: React.FC = ({children}) => {
  const {account} = useWallet()

  return (
    <Box>
      {!!account ? 
        children 
        : (
          <Flex center column minHeight="100vh" height="100%">
            <img src={treasury256} alt="treasury" height="96" width="auto" />
            <Typography variant="h5" color="primary" align="center">Connect your Ethereum Wallet</Typography>
            <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
              Not decentralized enough! Please connect your Web3 provider to view this content.
            </Typography>
            <Web3ConnectButton size='large' useWalletIcon />
          </Flex>
        )}
    </Box>
  )
}