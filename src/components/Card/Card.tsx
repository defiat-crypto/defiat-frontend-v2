import { Box, Paper, PaperProps } from '@material-ui/core'
import React from 'react'
import { Flex, FlexProps } from '../Flex'

interface CardProps {
  
}

export const Card: React.FC<PaperProps> = ({
  children,
  ...props
}) => {
  return (
    <Paper variant="outlined" {...props}> 
      <Box p={3}>
        {children}
      </Box>
    </Paper>
  )
}
