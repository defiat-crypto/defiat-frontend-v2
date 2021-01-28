import React from 'react'
import { Display } from '../../components/Display'
import anystakeBrand from '../../assets/img/anystakeBrand.png'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { SocialMediaButtons } from '../../components/SocialMediaButtons'

const useStyles = makeStyles((theme) => ({
  image: {
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '192px'
    },
    [theme.breakpoints.up('md')]: {
      width: '432px'
    }
  },
}))

export const Staking = () => {
  const classes = useStyles()

  return (
  <Display column center>
    <Box>
      <img src={anystakeBrand} className={classes.image} alt="anystake-brand" />
    </Box>
    <Typography variant="h4" color="primary" align="center">Coming Soon</Typography>
    <Typography variant="subtitle1" color="textSecondary" align="center">
      The future of DeFi ERC20 Staking will be here soon. Join our
      communities for more news and developments.
    </Typography>
    <SocialMediaButtons />
  </Display>
  )
}
