import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Display } from '../../../components/Display/Display'
import { Flex } from '../../../components/Flex'
import logo512 from '../../../assets/img/logo512.png'
import { SocialMediaButtons } from '../../../components/SocialMediaButtons'

const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: theme.palette.primary.light
  }
}))

export const Splash = () => {
  const classes = useStyles()

  return (
    <Display>
      <Flex center>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" color="primary"><b>DeFiat</b></Typography>
            <Typography variant="h5" className={classes.subtitle} gutterBottom><b>A New Brand of Decentralized Finance</b></Typography>
            <Typography variant="body2" gutterBottom>
              Finance used to be controlled by large institutions. Not anymore. 
              Decentralized technology has taken the ledger public and yields
              are higher than ever before. Join the revolution and start your own
              financial liberation today.
            </Typography>
            <SocialMediaButtons />
          </Grid>
          <Grid item xs={12} md={4}>
            <Flex center>
            <img src={logo512} alt="defiat" height="320px" width="auto" />
            </Flex>
            
          </Grid>
        </Grid>
      </Flex>
      
    </Display>
  )
}
