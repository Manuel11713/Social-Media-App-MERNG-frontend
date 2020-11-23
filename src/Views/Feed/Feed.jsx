import React from 'react';

import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import Chat from '../../Components/Chat/Chat';
import NewPost from './Components/NewPost/NewPost';

const Feed = () => {
    return(
        <div>
            <HeaderBar/>
            <NewPost/>

            <Chat/>
        </div>
    );
}

export default Feed;