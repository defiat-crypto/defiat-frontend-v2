import { Button, ButtonGroup } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Flex } from '../../../components/Flex'

export const SecondButtonGroup = () => {
  const history = useHistory()

  return (
    <Flex center>
      <ButtonGroup color="primary">
        <Button onClick={() => history.push('/second')}>Swap</Button>
        <Button onClick={() => history.push('/second/pool')}>Farm</Button>
      </ButtonGroup>
    </Flex>
  )
}
