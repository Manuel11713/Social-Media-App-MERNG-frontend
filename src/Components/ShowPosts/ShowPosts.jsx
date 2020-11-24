import React from 'react';

import './ShowPosts.css';
import Post from './Components/Post/Post';


const ShowPosts = ({posts}) => {
    return(
        <>
            {posts.map(post => <Post key={post.id} post={post}/>)}
        </>
    );
}



export default ShowPosts;