import { Toolbar } from '@material-ui/core'
import React from 'react'
import { Flex, FlexProps } from '../Flex'

interface DisplayProps extends FlexProps {
  offset?: boolean
}

export const Display: React.FC<DisplayProps> = ({ 
  offset,
  children, 
  ...props 
}) => {

  return (
    <Flex 
      height="100vh"
      minHeight={1}
      {...props}
    >
      {!!offset && <Toolbar />}
      {children}
    </Flex>
  )
}
