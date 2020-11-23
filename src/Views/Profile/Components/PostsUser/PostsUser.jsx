import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {useParams} from 'react-router-dom';
import SpinnerLoading from '../../../../Components/SpinnerLoading/SpinnerLoading';
import ShowPosts from '../../../../Components/ShowPosts/ShowPosts';

import './PostsUser.css'


const GETPOSTS_QUERY = gql`
    query GetPosts($userid:ID!){
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

    const { loading, data } = useQuery(GETPOSTS_QUERY,{variables:{userid}});
    if(!data)return <div></div>
    let posts = data?.getPosts;
    return(
        <div className="posts-user-container">
            {loading ? <SpinnerLoading /> : <ShowPosts posts={posts} />}
        </div>
    );
}

export default PostsUser;