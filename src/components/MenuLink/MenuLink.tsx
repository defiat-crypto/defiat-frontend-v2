import { makeStyles, Menu, MenuItem, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Flex } from "../Flex";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useHistory } from "react-router-dom";
import { isTestnet } from "../../utils";

const useStyles = makeStyles((theme) => ({
  link: {
    cursor: "pointer",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary,
    },
  },
}));

export const MenuLink = () => {
  const history = useHistory();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path?: string) => {
    setAnchorEl(null);
    if (!!path) {
      history.push(path);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Flex mr={0}>
      <Flex className={classes.link} onClick={handleOpen}>
        <Typography variant="body1">Services</Typography>
        <ArrowDropDownIcon />
      </Flex>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoFocus={false}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={() => handleClose("/staking")}>AnyStake</MenuItem>
        {isTestnet() && (
          <MenuItem onClick={() => handleClose("/regulator")}>
            Regulator
          </MenuItem>
        )}
        <MenuItem onClick={() => handleClose("/second")}>2nd Chance</MenuItem>
      </Menu>
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
  );
};
