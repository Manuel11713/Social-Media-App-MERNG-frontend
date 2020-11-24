import React, {useState} from 'react';

import moment from 'moment';
import {connect} from 'react-redux';


import {Avatar, Card, CardHeader, CardMedia, CardActions, IconButton, CardContent, Typography} from '@material-ui/core';
import {AccountCircle, Forum, MoreVert,  Share} from '@material-ui/icons';

import Comments from '../Comments/Comments';
import IconLike from '../IconLike/IconLike';


import './Post.css';


const Post = ({post, user}) => {
    const [showComments, setShowComments] = useState(false);
    const {body, comments, imgProfile, imgPost, createdAt, likeCount, likes, username } = post;
    const postid = post.id;
    return(
        
            <Card className="post-card" key={post.id}>
                <CardHeader
                    avatar={imgProfile?<Avatar src={imgProfile}/>:<AccountCircle className="post-avatar" style={{fontSize:40}}/>}
                    action={
                    <IconButton aria-label="settings">
                        <MoreVert/>
                    </IconButton>
                    }
                    title={username}
                    subheader={moment(createdAt).fromNow()}
                />
                {imgPost ? <CardMedia image={imgPost}/> : null}
                
                <CardContent>
                    <Typography variant="body1" component="p">
                        {body}
                    </Typography>
                </CardContent>

                <CardActions className="card-actions-post" disableSpacing>
                    
                    <IconLike userid={user.id} likes={likes} likeCount={likeCount} postid={postid}/>

                    <IconButton className={showComments?'active-comments':null} aria-label="forum" onClick={()=>setShowComments(!showComments)}>
                        <Forum />
                    </IconButton>

                    <IconButton aria-label="share">
                        <Share />
                    </IconButton>
                    
                </CardActions>
                <div className={showComments?'show-comments':'hidde-comments'}>
                    <Comments comments={comments} postid={postid}/>
                </div>
            </Card>
        
    );
}


const stateToProps = state => {
    return({
        user:state.user
    });
}

export default connect(stateToProps, null)(Post);