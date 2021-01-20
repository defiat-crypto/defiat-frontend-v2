import { Typography } from '@material-ui/core'
import React from 'react'
import { Card } from '../../../components/Card'
import { Flex } from '../../../components/Flex'
import { TextDecoration } from '../../../components/TextDecoration'

interface DashboardValueCardProps {
  value: string
  name: string
  startSymbol?: string
  endSymbol?: string
}

export const DashboardValueCard: React.FC<DashboardValueCardProps> = ({
  value,
  name,
  startSymbol,
  endSymbol
}) => {
  return (
    <Card>
      <Flex align="flex-end">
        {!!startSymbol && <Typography variant="body1">{startSymbol}</Typography>}
        <Typography variant="h5">{value}</Typography>
        {!!endSymbol && <Typography variant="body1">{endSymbol}</Typography>}
      </Flex>
      <TextDecoration />
      <Typography variant="body2" color="textSecondary">{name}</Typography>
    </Card>
  )
}
