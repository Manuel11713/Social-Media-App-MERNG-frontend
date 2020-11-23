import React, { useEffect }  from 'react';
import {gql, useQuery} from '@apollo/client';
import {connect} from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Accordion, AccordionSummary, AccordionDetails, Badge, Typography} from '@material-ui/core';

import './Chat.css';

const QUERY_GETUSERBYID = gql`
    query GetUserbyID($userid:ID){
        getUserbyID(userid:$userid){
            friends{
                userid
                username
            }
        }
    }
`;

const ListFriends = ({friends}) => {
    return(
        <div id="friends-chat-list">
            {friends.map(friend => {
                const {username, userid} = friend;
                return(
                    <div className="item-friend" key={userid}>
                        <AccountCircleIcon style={{color:'#2196f3'}}/>
                        <span className="item-friend-username">
                            {username}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

const Chat = ({user, friends, setFriends}) => {
    
    const {data, loading} = useQuery(QUERY_GETUSERBYID,{variables:{userid:user.id}});
    
    useEffect(()=>{
        if(loading)return;
        setFriends(data.getUserbyID.friends)
    },[loading,data, setFriends]);

    return(
        <Accordion id="chat-container">
            <AccordionSummary>
                <Typography id="title-chat" variant="h6">
                    <Badge 
                        badgeContent={friends.length} 
                        color="primary"
                    >
                        Friends Active
                    </Badge>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
            
                    
                {!loading ? 
                <ListFriends friends={friends} /> :
                <div>loading</div>
                }

            </AccordionDetails>
        </Accordion>
    );
}

const stateToProps = state => {
    return({
        user: state.user,
        friends: state.friends
    });
}

const dispatchToProps = dispatch => {
    return({
        setFriends(friends){
            dispatch({
                type:'SET_FRIENDS',
                friends
            });
        }
    })
}

export default connect(stateToProps, dispatchToProps)(Chat);