import { makeStyles } from '@material-ui/core'
import React from 'react'

interface IHorizontalImage {
  image:string,
  alt:string
}

const useStyles = makeStyles((theme) => ({
  image: {
    height: 'auto',
    [theme.breakpoints.up('lg')]: {
      width: '512px'
    },
    [theme.breakpoints.down('md')]: {
      width: '192px'
    }
  }
}))

export const HorizontalImage: React.FC<IHorizontalImage> = ({
  image,
  alt
}) => {
  const classes = useStyles();

  return <img src={image} className={classes.image} alt={alt} />
}
