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
      height="100%"
      minHeight="100vh"
      {...props}
    >
      {!!offset && <Toolbar />}
      {children}
    </Flex>
  )
}
