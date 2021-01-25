import { Typography } from '@material-ui/core'
import React from 'react'
import { Web3ConnectView } from '../../../components/Web3ConnectView'
import { SanctuaryPoolCard } from './components/SanctuaryPoolCard'
import { SecondWrapper } from '../SecondWrapper'

export const SecondPool = () => {
  return (
    <Web3ConnectView>
      <SecondWrapper
        children={[
          <SanctuaryPoolCard />,
          <Typography variant="body1"  align="center">
            * 10% Unstaking Fee, which is added as liquidity to Uniswap
          </Typography>
        ]}
      />
    </Web3ConnectView>
  )
}
