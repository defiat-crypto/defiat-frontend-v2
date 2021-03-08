import React from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import Routes from "./routes";
import theme from "./theme";
import { UseWalletProvider } from "use-wallet";
import ModalProvider from "./contexts/Modal";
import DeFiatProvider from "./contexts/DeFiat";
import { SnackbarProvider } from "notistack";

const App = () => {
  const chainId = !window.location.href.includes("rinkeby") ? 1 : 4;

  return (
    <UseWalletProvider
      chainId={chainId}
      connectors={{
        walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
      }}
    >
      <DeFiatProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <ModalProvider>
              <Routes />
            </ModalProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </DeFiatProvider>
    </UseWalletProvider>
  );
};

export default App;
