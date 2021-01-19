import { BoxProps, useTheme } from '@material-ui/core'
import React from 'react'
import { Flex } from '../Flex'

interface DisplayProps extends BoxProps {
  offset?: boolean
}

export const Display: React.FC<DisplayProps> = ({ 
  offset,
  children, 
  ...props 
}) => {

  const theme = useTheme()
  return (
    <Flex 
      height="100vh"
      minHeight={1}
      marginTop={offset!! ? theme.mixins.toolbar.minHeight : undefined}
      {...props}
    >
      {children}
    </Flex>
  )
}
