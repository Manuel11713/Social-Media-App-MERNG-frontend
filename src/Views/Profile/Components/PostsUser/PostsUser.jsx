import React,{useState} from 'react';
import { gql, useMutation } from '@apollo/client';
import {useParams} from 'react-router-dom';
import SpinnerLoading from '../../../../Components/SpinnerLoading/SpinnerLoading';
import ShowPosts from '../../../../Components/ShowPosts/ShowPosts';

import './PostsUser.css'
import { useEffect } from 'react';


const GETPOSTS_MUTATION = gql`
    mutation GetPosts($userid:ID!){
        getPosts(userid:$userid){
            id
            body
            createdAt
            username
            comments{
                id
                body
                username
                createdAt
            }
            likes{
                id
                userid
                username
                createdAt
            }
            likeCount
            commentCount

        }
    }
`;

const PostsUser = () => {
    const {userid} = useParams();
    const [data, setData] = useState(null);
    const [getPosts] = useMutation(GETPOSTS_MUTATION);

    useEffect(()=>{
        let fetch = async () => {
            let {data} = await getPosts({variables:{userid}});
            setData(data);
        }
        fetch();
    },[userid, getPosts]);

    if(!data)return <div></div>
    let posts = data?.getPosts;
    return(
        <div className="posts-user-container">
            {!data ? <SpinnerLoading /> : <ShowPosts posts={posts} />}
        </div>
    );
}

export default PostsUser;