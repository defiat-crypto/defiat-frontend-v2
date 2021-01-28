import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Flex } from '../Flex'
import logo192 from '../../assets/img/logo192.png'
import { SocialMediaButtons } from '../SocialMediaButtons'
import SiteMap from '../../constants/map'
import { Link } from '../Link'
import WhitepaperV2 from '../../assets/files/DFT-DeFiat-Whitepaper.pdf'

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTopWidth: '2px',
    borderTopColor: theme.palette.primary.light,
    borderTopStyle: 'solid'
  }
}))

export const Footer = () => {
  const classes = useStyles()

  return (
    <Flex className={classes.footer} py={1} mt={3}>
      <Container maxWidth='lg'>
        <Grid container alignItems="center">
          <Grid item xs={12} md={4}>
            <Flex center>
              <img src={logo192} alt="defiat" height="48px" width="auto" />
              <Flex ml={1}>
                <Typography variant="h4"><b>DeFiat</b></Typography>
              </Flex>
            </Flex>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container >
              {[...SiteMap.routes, ...SiteMap.footer].map((route:any, i:number) => (
                <Grid item xs={12} md={6} key={i}>
                  <Link name={route.name} path={route.path} center />
                </Grid>
              ))}
              <Grid item xs={12} md={6}>
                <Link name="Whitepaper" href={WhitepaperV2} center footer />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Flex center column>
              <Typography variant="h5" color="primary">Follow Us</Typography>
              <SocialMediaButtons />
            </Flex>
          </Grid>
        </Grid>
      </Container>
      
    </Flex>
  )
}
