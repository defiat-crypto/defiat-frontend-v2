import { Paper } from '@material-ui/core'
import React from 'react'
import { Flex, FlexProps } from '../Flex'

interface CardProps {
  
}

export const Card: React.FC<FlexProps> = ({
  children,
  ...props
}) => {
  return (
    <Flex {...props}>
      <Paper variant="outlined"> 
        <Flex p={3} {...props}>
          {children}
        </Flex>
      </Paper>
    </Flex>
    
  )
}
