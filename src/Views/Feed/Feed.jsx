import React from 'react';



import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import NewPost from './Components/NewPost/NewPost';

const Feed = () => {
    return(
        <div>
            <HeaderBar/>
            <NewPost/>
        </div>
    );
}

export default Feed;