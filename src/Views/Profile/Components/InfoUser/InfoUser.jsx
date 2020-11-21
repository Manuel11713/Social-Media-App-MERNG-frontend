import React from 'react';
import {connect } from 'react-redux';

import {Typography} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';

import './InfoUser.css';

const InfoUser = ({user}) => {
    const {email, username} = user;
    return(
        <div >
            <div className="info-user">
                <AccountCircle className="avatar-user" style={{fontSize:200}}/>
            </div>
            <div className="info-user-text">
                <div className="info-user">
                    <Typography variant="h5">{email}</Typography>
                </div>
                <div className="info-user">
                    <Typography variant="h5">{username}</Typography>
                </div>
            </div>
        </div>
    );
}
const stateToProps = state => {
    return({
        user:state.user
    });
}

export default connect(stateToProps, null)(InfoUser);