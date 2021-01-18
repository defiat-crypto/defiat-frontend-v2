import { Box, BoxProps } from '@material-ui/core'
import React from 'react'

interface FlexProps extends BoxProps {
  direction?: 'row' | 'column' | undefined,
  align?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | undefined,
  justify?: 'center' | 'space-between' | 'space-around' | 'flex-start' | 'flex-end' | undefined
}

export const Flex: React.FC<FlexProps> = ({
  direction,
  align,
  justify,
  children,
  ...props
}) => {
  return (
    <Box
      display={props.display || 'flex'}
      flexDirection={direction || 'row'}
      alignItems={align || undefined}
      justifyContent={justify || undefined}
      {...props} 
    >
      {children}
    </Box>
  )
}