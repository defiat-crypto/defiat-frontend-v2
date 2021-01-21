import { Link, Typography } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../components/Flex'
import { RecyclerCard } from './components/RecyclerCard'
import { SecondWrapper } from './SecondWrapper'

export const SecondRecycler = () => {
  return (
    <SecondWrapper
      children={[
        <RecyclerCard />,
        <Typography variant="body1"  align="center">
          * Receive up to 200% extra 2ND tokens when you recycle while holding DFT! (1 DFT = +1%)
        </Typography>,
        <Flex>
          <Typography variant="body2" color="textSecondary" align="center">What is 2nd Chance?</Typography>
          <Link variant="body2" align="center" color="primary">&nbsp;Learn More</Link>
        </Flex>
      ]}
    />
  )
}
