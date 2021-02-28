import { Box, Paper } from '@material-ui/core'
import React from 'react'

export const Card = ({ children }) => {
  return (
    <Paper>
      <Box p={2}>
        {children}
      </Box>
    </Paper>
  )
}
