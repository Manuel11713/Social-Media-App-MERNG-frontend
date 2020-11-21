import React from 'react';
import { gql, useQuery } from '@apollo/client';

import SpinnerLoading from '../../../../Components/SpinnerLoading/SpinnerLoading';
import ShowPosts from '../../../../Components/ShowPosts/ShowPosts';

import './PostsUser.css'


const GETPOSTS_QUERY = gql`
    query {
        getPosts{
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

    const { loading, data } = useQuery(GETPOSTS_QUERY);
    let posts = data?.getPosts;
    return(
        <div className="posts-user-container">
            {loading ? <SpinnerLoading /> : <ShowPosts posts={posts} />}
        </div>
    );
}

export default PostsUser;