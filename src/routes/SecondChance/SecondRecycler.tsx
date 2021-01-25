import { Typography } from '@material-ui/core'
import React from 'react'
import { RecyclerCard } from './components/RecyclerCard'
import { SecondWrapper } from './SecondWrapper'

export const SecondRecycler = () => {
  return (
    <SecondWrapper
      children={[
        <RecyclerCard />,
        <Typography variant="body1"  align="center">
          * Receive up to 200% extra 2ND tokens when you recycle while holding DFT! (1 DFT = +1%)
        </Typography>
      ]}
    />
  )
}
