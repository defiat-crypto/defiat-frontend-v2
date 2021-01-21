import { Typography } from '@material-ui/core'
import React from 'react'
import { SanctuaryPoolCard } from './components/SanctuaryPoolCard'
import { SecondWrapper } from './SecondWrapper'

export const SecondPool = () => {
  return (
    <SecondWrapper
      children={[
        <SanctuaryPoolCard />,
        <Typography variant="body1"  align="center">
          * 10% Unstaking Fee, which is added as liquidity to Uniswap
        </Typography>
      ]}
    />
  )
}
