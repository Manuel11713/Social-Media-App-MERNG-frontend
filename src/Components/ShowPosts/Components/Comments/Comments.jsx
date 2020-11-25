import React, { useState }  from 'react';
import {gql, useMutation} from '@apollo/client';
import {IconButton, InputBase} from '@material-ui/core';
import { Send }from '@material-ui/icons';
import Comment from './Comment';

import './Comments.css';

const MUTATION_CREATECOMMENT = gql`
    mutation CreateComment($postid:ID, $body:String){
        createComment(postid:$postid, body:$body){
            id
            body
            username
            createdAt
        }
    }
`;

const MUTATION_DELETECOMMENT = gql`
    mutation DeleteComment($postid:ID, $commentid:ID){
        deleteComment(postid:$postid, commentid:$commentid)
    }
`;


const Comments = ({comments, postid}) => {

    const [createComment] = useMutation(MUTATION_CREATECOMMENT);
    const [deleteCommentM] = useMutation(MUTATION_DELETECOMMENT);

    const [bodyComment, setBodyComment] = useState("");
    let [commentsA, setCommentsA] = useState(comments);

    const makePost = async () => {
        if(bodyComment.length === 0)return;
        let {data} = await createComment({variables:{postid,body:bodyComment}});
        commentsA.unshift(data.createComment);
    
        setBodyComment('');
        setCommentsA(commentsA);
    }

    const deleteComment =  (commentid) => async() => {
        commentsA =  commentsA.filter(comment => comment.id !== commentid);
        setCommentsA(commentsA);

        await deleteCommentM({variables:{commentid, postid}});
    }
    return(
        <div>
            <div className="input-comment-container">
                <InputBase
                    className="input-comment"
                    placeholder="Write a comment"
                    multiline
                    value={bodyComment}
                    onChange={(e)=>setBodyComment(e.currentTarget.value)}
                />  
                <IconButton className="send-icon" onClick={makePost}>
                    <Send/>
                </IconButton>
            </div>
            {commentsA.map(comment=>{
                return <Comment key={comment.id} comment={comment} deleteComment={deleteComment}/>
            })}
        </div>
    );
}

export default Comments;