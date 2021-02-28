import { Box } from '@material-ui/core'
import React from 'react'

export const Flex = ({
  direction,
  justify,
  align,
  children,
  ...props
}) => {
  return (
    <Box
      display='flex' 
      flexDirection={direction || 'row'}
      justifyContent={justify || undefined}
      alignItems={align || undefined}
      {...props}
    >
      {children}
    </Box>
  )
}
