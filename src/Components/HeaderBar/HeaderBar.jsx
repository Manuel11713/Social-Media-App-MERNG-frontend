import React,{useState} from 'react';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {AppBar, Button,Menu, MenuItem, Toolbar} from '@material-ui/core';

import './HeaderBar.css';

const HeaderBar = () => {
    const [anchorMenu, setAnchorMenu] = useState(null);

    const handleClick = (event) => {
      setAnchorMenu(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorMenu(null);
    };
    return(
        <header>
            <AppBar position="static">
                <Toolbar className="toolbar-header">
                    <Button className="profile-button" onClick={handleClick}>
                        <AccountCircleIcon style={{fontSize:40}}/>
                    </Button>
                </Toolbar>
            </AppBar>

            <Menu
                id="simple-menu"
                anchorEl={anchorMenu}
                keepMounted
                open={Boolean(anchorMenu)}
                onClose={handleClose}
                >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </header>
    );
}


export default HeaderBar;
