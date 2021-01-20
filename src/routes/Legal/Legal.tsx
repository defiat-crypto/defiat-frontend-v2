import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Toolbar, useTheme } from '@material-ui/core'
import { AccountBalanceRounded, WarningRounded } from '@material-ui/icons'
import React from 'react'
import { Header } from '../../components/Header'

export const Legal = () => {
  const theme = useTheme()

  return (
    <Box>
      <Toolbar />
      <Box pt={2}>
        <Header
          title="Legal"
          subtitle="Official DeFiat Notices & Disclaimer"
          align="center"
        />
        <Grid container alignItems='center' justify='center'>
          <Grid item xs={12} md={10}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <WarningRounded style={{color: theme.palette.success.main}} />
                </ListItemIcon>
                <ListItemText>
                  Purchasing DeFiat tokens, like any cryptographic token, involves substantial risk and may lead to loss of 
                  partial or full amount of money invested. You should only buy DFT tokens if you underthe nature of the 
                  tokens and the protocol, and if you accept the inherent risks.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccountBalanceRounded style={{color: theme.palette.success.main}} />
                </ListItemIcon>
                <ListItemText>
                  You take full responsibility in purchasing DeFiaT on centralized or decentralized exchanges. DeFiaT did not and 
                  will not organize an ICO (Initial Coin Offering). Any purchase, or trading you make that would result in a loss 
                  is your sole responsibility. If you choose to acquire DeFiat, you hereby agree to hold the DeFiat team NOT liable
                  for financial losses, damages or injuries caused to you or any party or individual.
                </ListItemText>
              </ListItem>
              {/* <ListItem>
                <ListItemIcon>

                </ListItemIcon>
                <ListItemText>
                  You take full responsibility in purchasing DeFiaT on centralized or decentralized exchanges. DeFiaT did not and 
                  will not organize an ICO (Initial Coin Offering). Any purchase, or trading you make that would result in a loss 
                  is your sole responsibility. If you choose to acquire DeFiat, you hereby agree to hold the DeFiat team NOT liable
                  for financial losses, damages or injuries caused to you or any party or individual.
                </ListItemText>
              </ListItem> */}
            </List>
          </Grid>
        </Grid>
        
      </Box>
      
    </Box>
  )
}
