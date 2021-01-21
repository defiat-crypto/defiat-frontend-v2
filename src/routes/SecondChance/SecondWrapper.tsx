import { Grid } from '@material-ui/core'
import React from 'react'
import { Display } from '../../components/Display'
import { SecondButtonGroup } from './components/SecondButtonGroup'

interface SecondWrapperProps {
  children: React.ReactNode[]
}

export const SecondWrapper: React.FC<SecondWrapperProps> = ({ children }) => {
  return (
    <Display offset center column>
      <Grid container spacing={3} direction='column' alignItems='center'>
        <Grid item>
          <SecondButtonGroup />
        </Grid>
        {children && children.length > 0 && children.map((child:React.ReactNode, i:number) => (
          <Grid item key={i}>
            {child}
          </Grid>
        ))}
        
      </Grid>
    </Display>
  )
}
