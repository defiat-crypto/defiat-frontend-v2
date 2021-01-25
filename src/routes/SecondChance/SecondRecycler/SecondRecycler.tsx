import { Typography } from '@material-ui/core'
import React from 'react'
import { Web3ConnectView } from '../../../components/Web3ConnectView'
import { RecyclerCard } from './components/RecyclerCard'
import { SecondWrapper } from '../SecondWrapper'

export const SecondRecycler = () => {
  return (
    <Web3ConnectView>
      <SecondWrapper
        children={[
          <RecyclerCard />,
          <Typography variant="body1"  align="center">
            * Receive up to 200% extra 2ND tokens when you recycle while holding DFT! (1 DFT = +1%)
          </Typography>
        ]}
      />
    </Web3ConnectView>
  )
}
