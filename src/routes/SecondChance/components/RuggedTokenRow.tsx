import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../../components/Flex'
import { TextDecoration } from '../../../components/TextDecoration'

interface RuggedTokenRowProps {
  symbol: string
  name: string
  balance: string
}

export const RuggedTokenRow: React.FC<RuggedTokenRowProps> = ({
  symbol,
  name,
  balance
}) => {
  return (
    <Box>
      <TextDecoration />
      <Flex justify='space-between' align='center'>
        <Flex>
          <Typography variant="body1"><b>{symbol}</b></Typography>
          <Typography variant="body1">&nbsp;{name}</Typography>
        </Flex>
        <Typography variant="body1" align="left">{balance}</Typography>
      </Flex>
    </Box>
    
  )
}
