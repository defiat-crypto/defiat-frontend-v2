import { Typography } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../../components/Flex'
import { TextDecoration } from '../../../components/TextDecoration'

interface ValueProps {
  value: string
  name: string
  endSymbol?:string
}

export const Value: React.FC<ValueProps> = ({
  value,
  name,
  endSymbol
}) => {
  return (
    <Flex column center p={2}>
      <Flex align='flex-end'>
        <Typography variant="h5"><b>{value}</b></Typography>
        {endSymbol && <Typography variant="body1">&nbsp;{endSymbol}</Typography>}
      </Flex>
      
      <TextDecoration />
      <Typography variant="subtitle2" color="textSecondary">{name}</Typography>
    </Flex>
  )
}
