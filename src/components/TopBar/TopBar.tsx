import { AppBar, Container, makeStyles, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { createRef } from 'react'
import { Flex } from '../Flex'
import logo192 from '../../assets/img/logo192.png'
import { MobileMenu } from './components/MobileMenu'
import { DesktopMenu } from './components/DesktopMenu'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    zIndex: theme.zIndex.appBar
  },
  ticker: {
    color: theme.palette.primary.light
  }
}))

export const TopBar = () => {
  const classes = useStyles()
  const appBar = createRef()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <AppBar position="sticky" className={classes.appBar} ref={appBar}>
      <Container maxWidth="lg">
        <Toolbar>
          <Flex align="center" grow>
            <img src={logo192} alt="defiat" height="32px" width="auto" />
            <Flex ml={1}>
              <Typography variant='h4' className={classes.ticker}>
                <b>DFT</b>
              </Typography>
            </Flex>
            <Flex ml={1}>
              <Typography variant='h4'>
                DeFiat
              </Typography>
            </Flex>
          </Flex>
          <Flex align="center">
            {mobile ? <MobileMenu anchorRef={appBar} /> : <DesktopMenu />}
          </Flex>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
