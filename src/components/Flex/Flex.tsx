import { Box, BoxProps } from '@material-ui/core'
import React from 'react'

export interface FlexProps extends BoxProps {
  direction?: 'row' | 'column' | undefined,
  align?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | undefined,
  justify?: 'center' | 'space-between' | 'space-around' | 'flex-start' | 'flex-end' | undefined,
  grow?: true | number,
  column?: boolean,
  center?: boolean,
}

export const Flex: React.FC<FlexProps> = ({
  direction,
  align,
  justify,
  grow,
  column,
  center,
  children,
  ...props
}) => {
  return (
    <Box
      display={props.display || 'flex'}
      flexDirection={!!column ? 'column' : direction || 'row'}
      alignItems={!!center ? 'center' : align || undefined}
      justifyContent={!!center ? 'center' : justify || undefined}
      flexGrow={grow ? grow === true ? '1' : grow : undefined}
      {...props} 
    >
      {children}
    </Box>
  )
}