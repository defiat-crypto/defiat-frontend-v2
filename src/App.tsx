import React from 'react';
import {ThemeProvider, CssBaseline} from '@material-ui/core'
import Routes from './routes'
import theme from './theme'
import { UseWalletProvider } from 'use-wallet';
import ModalProvider from './contexts/Modal';

const App = () => {
  const chainId = !window.location.href.includes('rinkeby') ? 1 : 4 

  return (
    <UseWalletProvider 
      chainId={chainId} 
      connectors={{walletconnect: {rpcUrl: "https://mainnet.eth.aragon.network/"}}}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalProvider>
          <Routes />
        </ModalProvider>
      </ThemeProvider>
    </UseWalletProvider>    
  )
}

export default App;
