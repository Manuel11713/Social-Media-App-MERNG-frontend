import React, { useState, useEffect } from 'react';
import {gql, useMutation} from '@apollo/client';
import {connect} from 'react-redux';
import SendMessage from './SendMessage';
import moment from 'moment';
import {Typography} from '@material-ui/core';
import './ListMessages.css';

const MUTATION_CREATECHAT = gql`
    mutation CreateChat($partnerid: ID!, $partnername: String!){
        createChat(partnerid: $partnerid, partnername: $partnername){
            _id
            messages{
                sender_id
                sender_username
                body_message
                createdAt
            }
        }
    }
`;

const MUTATION_GETCHAT = gql`
    mutation GetChat($chatid: ID!){
        getChat(chatid: $chatid){
            _id
            messages{
                sender_id
                sender_username
                body_message
                createdAt
            }
        }
    }
`;



const ListMessages = ({chatid, activeChat, user}) => {
    const [createChat] = useMutation(MUTATION_CREATECHAT);
    const [getChat] = useMutation(MUTATION_GETCHAT);

    const {userid, username} =  activeChat;

    let [_chatid, setChatid] = useState(null);
    let [messages, setMessages] = useState([]);

    useEffect(()=>{

        const fetchCreateChat = async () => {
            let {data} = await createChat({variables:{partnerid:userid, partnername:username}});
            setMessages(data.createChat.messages);
            setChatid(data.createChat._id);
        }
        const fetchGetChat = async () => {
            let {data} = await getChat({variables:{chatid}});
            setMessages(data.getChat.messages);
            setChatid(data.getChat._id);
        }
        if(!chatid){
            fetchCreateChat();
        }else{
            fetchGetChat();
        }
    },[userid, username, createChat , getChat, chatid]);
    
    return(
        <div id="list-messages-container">
            <div className="">
                {messages.map(message => {
                    const {body_message, createdAt, sender_username} = message;
                    return(
                        <div className={user.username===sender_username?'sender-message':'reciver-message'}>
                            <Typography variant="body2" className={user.username===sender_username?'sender-message-body':'reciver-message-body'}>
                                {body_message}
                                <span className="createdAt-message">{moment(createdAt).fromNow()}</span>
                            </Typography>
                        </div>
                    );
                }).reverse()}
            </div>
            
            <SendMessage _chatid={_chatid}/>
            
        </div>
    );
}

const stateToProps = state => {
    return({
        user: state.user
    });
}

export default connect(stateToProps, null)(ListMessages);