import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Flex } from '../Flex'
import LaunchIcon from '@material-ui/icons/Launch'

interface LinkProps {
  name: string,
  path?: string,
  href?: string
}

const useStyles = makeStyles((theme) => ({
  link: {
    cursor: 'pointer',
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary
    }
  },
  external: {
    cursor: 'pointer',
    color: theme.palette.primary.light,
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
}))

export const Link: React.FC<LinkProps> = ({
  name,
  path,
  href
}) => {
  const history = useHistory()
  const classes = useStyles()

  const handleExternalLink = () => {
    const newWindow = window.open(href, '_blank', 'noopener,noreferrer')
    if (newWindow) {
      newWindow.opener = null
    }
  }

  return (
    <Flex>
      {!!path && (
        <Typography 
          variant="body1" 
          className={classes.link}
          onClick={() => history.push(path)}
        >
          {name}
        </Typography>
      )}
      {!!href && (
        <Flex className={classes.external} align='center' onClick={handleExternalLink}>
          <Typography variant="body1">{name}</Typography>
          <LaunchIcon style={{height:'0.75rem'}} />
        </Flex>
      )}
    </Flex>
  )
}