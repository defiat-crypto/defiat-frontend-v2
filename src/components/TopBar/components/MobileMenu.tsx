import { Divider, IconButton, ListSubheader, Menu, MenuItem, MenuList } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../Flex'
import MenuIcon from '@material-ui/icons/Menu'
import { Web3ConnectButton } from '../../Web3ConnectButton'
import { useHistory } from 'react-router-dom'

interface MobileMenuProps {
  anchorRef: any;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  anchorRef
}) => {
  const history = useHistory()

  const [anchorEl, setAnchorEl] = React.useState();
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    console.log(anchorRef)
    setAnchorEl(anchorRef.current);
  };

  const handleClose = (path?: string) => {
    setAnchorEl(null);
    if (!!path) {
      history.push(path)
    }
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

        style={{ marginTop: '16px', width: '100vw', display: 'flex' }}
      >
        <ListSubheader>DeFiat</ListSubheader>
        <MenuItem onClick={() => handleClose('/')}>Home</MenuItem>
        <MenuItem onClick={() => handleClose('/faq')}>FAQ</MenuItem>
        <MenuItem onClick={() => handleClose('/news')}>News</MenuItem>
        <MenuItem onClick={() => handleClose('/dashboard')}>Dashboard</MenuItem>
        <ListSubheader>Services</ListSubheader>
        <MenuItem onClick={() => handleClose('/staking')}>AnyStake</MenuItem>
        <MenuItem onClick={() => handleClose('/regulator')}>Regulator</MenuItem>
        <MenuItem onClick={() => handleClose('/second')}>2ND Chance</MenuItem>
        <Divider />
        <Flex center p={1}>
          <Web3ConnectButton />
        </Flex>
      </Menu>
    </Flex>
  )
}
