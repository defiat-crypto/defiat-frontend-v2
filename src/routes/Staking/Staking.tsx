import React from 'react'
import { Display } from '../../components/Display'
import anystakeBrand from '../../assets/img/anystakeBrand.png'
import { Box, Typography } from '@material-ui/core'
import { SocialMediaButtons } from '../../components/SocialMediaButtons'

export const Staking = () => {
  return (
  <Display column center>
    <Box>
      <img src={anystakeBrand} alt="anystake-brand" />
    </Box>
    <Typography variant="h4" color="primary">Coming Soon</Typography>
    <Typography variant="subtitle1" color="textSecondary">
      The future of DeFi ERC20 Staking will be here soon. Join our
      communities for more news and developments.
    </Typography>
    <SocialMediaButtons />
  </Display>
  )
}
