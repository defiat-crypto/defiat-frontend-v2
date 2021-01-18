import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

export const TopBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant='h4'>
          DFT
        </Typography>
        <Typography variant='h4'>
          DeFiat
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
