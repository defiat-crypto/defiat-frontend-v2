import { IconButton, ListSubheader, Menu, MenuItem, MenuList } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../Flex'
import MenuIcon from '@material-ui/icons/Menu'

interface MobileMenuProps {
  anchorRef: any;
}

export const MobileMenu : React.FC<MobileMenuProps> = ({
  anchorRef
}) => {

  const [anchorEl, setAnchorEl] = React.useState();
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    console.log(anchorRef)
    setAnchorEl(anchorRef.current);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };


  return (
    <Flex>
      <IconButton edge="end" color="inherit" aria-label="menu">
        <MenuIcon onClick={handleMenu} />
      </IconButton>
      <Menu 
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        variant='selectedMenu'
        
        style={{marginTop: '16px', width: '100vw', display: 'flex'}}
      >
        <ListSubheader>DeFiat</ListSubheader>
        <MenuItem>Home</MenuItem>
        <MenuItem>News</MenuItem>
        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Staking</MenuItem>
        <ListSubheader>Services</ListSubheader>
        <MenuItem>2ND Chance</MenuItem>
      </Menu>
    </Flex>
  )
}
