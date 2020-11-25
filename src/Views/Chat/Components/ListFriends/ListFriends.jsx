import React from 'react';

import {Typography} from '@material-ui/core';
import {AccountCircle}from '@material-ui/icons';
import './ListFriends.css';

const ListFriends = ({friends, setActiveChat}) => {

    const handleClick = (friend) => () => {

        setActiveChat(friend);
    }
    
    return(
        <>
            {friends.map(friend => {
                return(
                    <div className="item-friend-chat" key={friend.userid} onClick={handleClick(friend)}>
                        <AccountCircle className="item-friend-chat-icon" />
                        <Typography
                            className="item-friend-chat-username"
                        >
                            {friend.username}
                        </Typography>
                    </div>
                );
            })}
        </>
    );
}

export default ListFriends;