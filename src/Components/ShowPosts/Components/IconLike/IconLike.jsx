import React,{useState, useEffect} from 'react';

import {gql, useMutation} from '@apollo/client';

import {Button} from '@material-ui/core';
import {Favorite} from '@material-ui/icons';


const LIKEPOST_MUTATION = gql`
    mutation LikePost($postid:ID!){
        likePost(postid:$postid)
    }
`;
const REMOVELIKEPOST_MUTATION = gql`
    mutation RemoveLikePost($postid:ID!){
        removeLikePost(postid:$postid)
    }
`;

const IconLike = ({likeCount, postid, likes, userid}) => {
    const [liked, setLiked] = useState(false);
    const [likeCountT, setLikeCount] = useState(likeCount);

    const [likePost] = useMutation(LIKEPOST_MUTATION);
    const [removelikePost] = useMutation(REMOVELIKEPOST_MUTATION);

    const  sendLike = async () => {
        await likePost({variables:{postid}});
        setLiked(true)
        setLikeCount(likeCountT+1);
    }

    const removeLike = async () => {
        await removelikePost({variables:{postid}});
        setLiked(false);
        setLikeCount(likeCountT-1);
    }

    useEffect(()=>{
        let indexLike = likes.findIndex(like => like.userid === userid );
        if(indexLike !== -1) setLiked(true);
    },[setLiked, likes, userid]);

    return(
        <>
            {liked?
            <Button 
                variant="contained"
                style={{background:"#f50057",color:'#fff'}}
                startIcon={<Favorite />}
                onClick={removeLike}
            >
                {likeCountT}
            </Button>:
            <Button
                variant="contained"
                color="default"
                startIcon={<Favorite />}
                onClick={sendLike}
            >
                {likeCountT}
            </Button>}
        </>
    )
}

export default IconLike;