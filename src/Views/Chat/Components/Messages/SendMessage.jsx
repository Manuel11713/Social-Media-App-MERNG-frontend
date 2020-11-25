import React, { useState } from 'react';
import {gql, useMutation} from '@apollo/client';
import {IconButton, InputBase} from '@material-ui/core';
import {Send} from '@material-ui/icons';

const MUTATION_SENDMESSAGE = gql`
    mutation SendMessage($chatid: ID!, $bodyMessage:String!){
        sendMessage(chatid: $chatid, bodyMessage: $bodyMessage){
            _id
            createdAt
        }
    }
`;

const SendMessage = ({_chatid}) => {
    const [bodyMessage, setBodyMessage] = useState("");
    const [sendMessage] = useMutation(MUTATION_SENDMESSAGE);

    const handleClick = async () => {
        if(bodyMessage.length === 0)return;
        await sendMessage({variables:{chatid: _chatid, bodyMessage}});
        setBodyMessage('');
    }
    return(
        <div id="send-message">
            <InputBase
                className="input-chat-message"
                placeholder="write a message"
                onChange={(e)=>setBodyMessage(e.currentTarget.value)}
            />
            <IconButton onClick={handleClick}> 
                <Send className="input-chat-icon" />
            </IconButton>
        </div>
    );
}
export default SendMessage;