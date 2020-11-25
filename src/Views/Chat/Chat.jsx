import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {gql, useQuery} from '@apollo/client';

import HeaderBar from '../../Components/HeaderBar/HeaderBar';

import ListFriends from './Components/ListFriends/ListFriends';
import Messages from './Components/Messages/Messages';

import {Card, Grid} from '@material-ui/core';
import './Chat.css';

const QUERY_GETCHATS = gql`
    query GetUserbyID($userid: ID!){
        getUserbyID(userid:$userid){
            chats{
                chatid
                partnerid
            }
        }
    }
`;
const QUERY_GETUSERBYID = gql`
    query GetUserbyID($userid: ID){
        getUserbyID(userid: $userid){
            friends{
                userid,
                username
            }
        }
    }
`;

const Chat = ({friends, setFriends, user}) => {



    const {loading, data} = useQuery(QUERY_GETCHATS,{variables:{userid:user.id}});
    const res = useQuery(QUERY_GETUSERBYID, {variables:{userid:user.id}});
    
    const [activeChat, setActiveChat] = useState(friends ?  friends[0] : null);
    
    useEffect(()=>{
        if(res.data){
            setFriends(res.data.getUserbyID.friends);
            setActiveChat(res.data.getUserbyID.friends[0])
        };
    },[res]);

    
   
    return(
        <>
            <HeaderBar/>
            { 
                !activeChat ? 
                <div>You have not friends yet</div> :
                <div id="messages-container">
                    <Card id="message-container-card">
                        <Grid className="grid-container-chat" container >
                            <Grid item xs={4} > 
                                <ListFriends friends={friends} setActiveChat={setActiveChat}/>
                            </Grid>
                            <Grid className="grid-item-messages" item xs={8}>
                                {
                                    loading ? null :
                                    <Messages chats={data.getUserbyID.chats} activeChat={activeChat} />
                                }
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            }
        </>
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
                type: 'SET_FRIENDS',
                friends
            });
        }
    });
}

export default connect(stateToProps, dispatchToProps)(Chat);