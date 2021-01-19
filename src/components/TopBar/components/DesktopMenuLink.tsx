import { Box, Link, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Flex } from '../../Flex'

interface DesktopMenuLinkProps {
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
  }
}))

export const DesktopMenuLink: React.FC<DesktopMenuLinkProps> = ({
  name,
  path,
  href
}) => {
  const history = useHistory()
  const classes = useStyles()

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
        <Link
          // component='a'
          variant="body1"
          target="_blank" 
          rel="noopener" 
          href={href} 
          className={classes.link}
        >
          {name}
        </Link>
      )}
    </Flex>
  )
}
