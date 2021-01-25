import React from 'react'
import { Flex } from '../Flex'
import LoadingScales from '../../assets/img/LoadingFarm.gif'
import { Typography } from '@material-ui/core'

export const LoadingView = () => {
  return (
    <Flex center column minHeight="100vh" height="100%">
      <img src={LoadingScales} alt="Loading..." />
      <Typography variant="h6" color="primary" align="center">Loading...</Typography>
    </Flex>
  )
}
