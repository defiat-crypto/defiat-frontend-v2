import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../Flex'
import { DesktopMenuLink } from './DesktopMenuLink'
import SiteMap from '../../../constants/map'
import { MenuLink } from '../../MenuLink'
import { Link } from '../../Link'

export const DesktopMenu = () => {
  return (
    <Grid container spacing={1}>
      {SiteMap.routes.map((route:any, i:number) => (
        <Grid item>
          <Link name={route.name} path={route.path} key={i} />
        </Grid>
      ))}
      <Grid item>
        <MenuLink />
      </Grid>
      {SiteMap.external.map((external:any, i:number) => (
        <Grid item>
          <Link name={external.name} href={external.href} key={i} />
        </Grid>
      ))}
      
      {/* <Grid item>
        
      </Grid>
      <DesktopMenuLink name="Home" route="/" />
      <DesktopMenuLink name="FAQ" route="/" />
      <DesktopMenuLink name="News" route="/" />
      <DesktopMenuLink name="Dashboard" route="/" />
      <DesktopMenuLink name="Staking" route="/" />
      <DesktopMenuLink name="Services" route="/" /> */}
    </Grid>
  )
}
