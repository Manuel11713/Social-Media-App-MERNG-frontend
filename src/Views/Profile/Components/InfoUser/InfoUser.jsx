import React from 'react';
import {useParams} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';
import {Typography} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';

import './InfoUser.css';

const QUERY_GETUSER = gql`
    query GetUserbyID($userid:ID!){
        getUserbyID(userid:$userid){
            email
            username
        }
    }
`;

const InfoUser = () => {
    const {userid} = useParams();
    const {data} = useQuery(QUERY_GETUSER,{variables:{userid}});

    if(!data)return <div></div>; 
    const {email, username} = data.getUserbyID;

    return(
        <div >
            <div className="info-user">
                <AccountCircle className="avatar-user" style={{fontSize:200}}/>
            </div>
            <div className="info-user-text">
                <div className="info-user">
                    <Typography variant="h5">{username}</Typography>
                </div>
                <div className="info-user">
                    <Typography variant="h5">{email}</Typography>
                </div>
            </div>
        </div>
    );
}


export default InfoUser;