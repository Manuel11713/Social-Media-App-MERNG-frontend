import React from 'react';
import ListMessages from './ListMessages';

const Messages = ({chats, activeChat}) => {
    
    const {userid} =  activeChat;
    let {chatid} = chats.filter(chat => chat.partnerid === userid)[0] || {};

    return(
        <ListMessages chatid={chatid} activeChat={activeChat}/>
    );
}

export default Messages;