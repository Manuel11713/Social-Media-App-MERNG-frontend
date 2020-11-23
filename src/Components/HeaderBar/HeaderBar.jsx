import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import {AppBar, Button,Menu, MenuItem, Toolbar} from '@material-ui/core';

import SearchBar from './Components/SearchBar/SearchBar';

import './HeaderBar.css';

const HeaderBar = ({user}) => {
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
                    <Link to='/feed'>
                        <Button className="profile-button">
                            <HomeIcon style={{fontSize:40}}/>
                        </Button>
                    </Link>
                    <SearchBar/>
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
                <MenuItem onClick={handleClose}>
                    <Link to={`profile/${user.id}`} >Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </header>
    );
}

const stateToProps = state => {
    return({
        user:state.user
    });
}

export default connect(stateToProps, null)(HeaderBar);
