import { makeStyles, Popover, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Flex } from '../Flex'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  link: {
    cursor: 'pointer',
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary
    }
  }
}))

export const MenuLink = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Flex mr={0}>
      <Flex 
        
        className={classes.link}
      >
        <Typography variant="body1">Services</Typography>
        <ArrowDropDownIcon />
      </Flex>
      {/* <Popover
        // id="mouse-over-popover"
        // className={classes.popover}
        // classes={{
        //   paper: classes.paper,
        // }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>Service 1</Typography>
        <Typography>Service 2</Typography>
      </Popover> */}
    </Flex>
  )
}
