import { Grid, Link, Typography } from '@material-ui/core'
import React from 'react'
import { Display } from '../../components/Display'
import { Flex } from '../../components/Flex'
import { RecyclerCard } from './components/RecyclerCard'
import { SecondButtonGroup } from './components/SecondButtonGroup'

export const SecondChance = () => {
  return (
    <Display offset center column>
      <Grid container spacing={3} direction='column' alignItems='center'>
        <Grid item>
          <SecondButtonGroup />
        </Grid>
        <Grid item>
          <RecyclerCard />
        </Grid>
        <Grid item>
          <Typography variant="body1"  align="center">
            * Receive up to 200% extra 2ND tokens when you recycle while holding DFT! (1 DFT = +1%)
          </Typography>
        </Grid>
      </Grid>
      <Flex mt={6}>
        <Typography variant="body2" color="textSecondary" align="center">What is 2nd Chance?</Typography>
        <Link variant="body2" align="center" color="primary">&nbsp;Learn More</Link>
      </Flex>
    </Display>
  )
}
