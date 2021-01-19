import classes from '*.module.css'
import { Divider, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Card } from '../../../../components/Card'
import { Flex } from '../../../../components/Flex'
import { TextDecoration } from '../../../../components/TextDecoration'

interface EcosystemDisplayProps {
  image: string
  title: string
  text: string
}


const useStyles = makeStyles((theme) => ({
  image: {
    [theme.breakpoints.up('md')]: {
      height: '128px'
    },
    [theme.breakpoints.down('sm')]: {
      height: '64px'
    },
    width: 'auto'
  },
  card: {
    [theme.breakpoints.up('lg')]: {
      height: '240px'
    },
    [theme.breakpoints.down('md')]: {
      height: '192px'
    },
    [theme.breakpoints.down('sm')]: {
      height: '160px'
    },
    [theme.breakpoints.down('xs')]: {
      height: '240px'
    },
    width: 'auto'
  },
}))

export const EcosystemDisplay: React.FC<EcosystemDisplayProps> = ({
  image,
  title,
  text
}) => {
  const classes = useStyles()

  return (
    <Flex column>
      <Flex center mb={3}>
        <img src={image} alt={`${title}`} className={classes.image} height="64px" />
      </Flex>
      <Card column className={classes.card} align='center'>
        <Typography variant="h5" align="center" gutterBottom>{title}</Typography>
        <TextDecoration />
        <Flex mt={1}>
          <Typography variant="body1" paragraph>{text}</Typography>
        </Flex>
      </Card>
    </Flex>
  )
}
