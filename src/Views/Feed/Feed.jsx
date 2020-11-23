import React from 'react';

import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import Chat from '../../Components/Chat/Chat';


import NewPost from './Components/NewPost/NewPost';
import PostsFriends from './Components/PostsFriends/PostsFriends';

const Feed = () => {
    return(
        <div>
            <HeaderBar/>
            <NewPost/>
            <PostsFriends />
            
            <Chat/>
        </div>
    );
}

export default Feed;