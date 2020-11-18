import React from 'react';
import { Link } from 'react-router-dom';
import {AppBar, Toolbar, Button} from '@material-ui/core';

import './BarLoginRegister.css';


const BarLoginRegister = () => {
    return(
        <AppBar position="static">
            <Toolbar id="buttons-bar-container">
                <Link className="link-to-register" to="/login">
                    <Button  className="button-link">
                        Login
                    </Button>
                </Link>
                <Link className="link-to-register" to="/register">
                    <Button className="button-link">
                        Register
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default BarLoginRegister;