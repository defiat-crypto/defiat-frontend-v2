import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Display } from '../../components/Display/Display'
import { Flex } from '../../components/Flex'
import logo512 from '../../assets/img/logo512.png'
import { Splash } from './components/Splash'
import { Ecosystem } from './components/Ecosystem'
import { Roadmap } from './components/Roadmap'

export const Home = () => {
  return (
    <Flex column>
      <Splash />
      <Ecosystem />
      <Roadmap />
    </Flex>
  )
}
