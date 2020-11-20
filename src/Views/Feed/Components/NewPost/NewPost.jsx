import React, { useState } from 'react';
import {gql, useMutation} from '@apollo/client';
import {Button, Typography} from '@material-ui/core';
import './NewPost.css';

const MUTATION_CREATE_POST = gql`
    mutation CreatePost($body:String!){
        createPost(body:$body){id}
    }
`;

const NewPost = () => {
    const [post, setPost] = useState("");
    const [createPost] = useMutation(MUTATION_CREATE_POST);

    const handlePost = async (event) => {
        event.preventDefault();

        if(!post.length===0)return;
        
        let {data} = await createPost({variables:{body:post}});
        
        let {id} = data.createPost;

        setPost("");
        console.log(id);

    }
    const onChangeText = (event) => {
        setPost(event.currentTarget.value);
    }
    return(
        <main id="new-post-container">
            <div className="form-container-post">
                <Typography variant="h5">Write a new post</Typography>
                <form onSubmit={handlePost}>
                    <textarea value={post} placeholder="What's in your mind?" className="input-post" onChange={onChangeText}/>
                    <div className="button-post-container">
                        <Button  type="submit" variant="contained" color="primary">Post</Button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default NewPost