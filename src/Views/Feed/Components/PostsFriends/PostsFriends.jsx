import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {gql, useMutation} from '@apollo/client';
import { useState } from 'react';
import ShowPosts from '../../../../Components/ShowPosts/ShowPosts';
import {shuffle} from '../../../../utils';


import './PostsFriends.css';

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


const PostsFriends = ({friends}) => {

    const [getPosts] = useMutation(GETPOSTS_MUTATION);
    const [friendsPosts, setFriendsPosts] = useState([]); 
    
    useEffect(()=>{
        let fetchData = async () => {
            if(!friends || friends.length===0)return;
            let promises = [];

            for(let friend of friends){
                let userid = friend.userid;
                let res = getPosts({variables:{userid}});
    
                promises.push(res);
            }
            
            let responses = await Promise.all(promises);
            
            let posts = [];
            for(let res of responses){
                posts = posts.concat(res.data.getPosts.slice(0,10));
            }

            setFriendsPosts(shuffle(posts));
        }
        
        fetchData()

    },[friends, getPosts]);
    return(
        <div id="posts-friends-container">
            <div id="posts-friends-lists">
                <ShowPosts posts={friendsPosts}/>
            </div>
        </div>
    );
}

const stateToProps = state => {
    return({
        friends: state.friends
    });
}

export default connect(stateToProps, null)(PostsFriends);