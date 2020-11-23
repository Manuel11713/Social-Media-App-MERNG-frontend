import React from 'react';

import moment from 'moment';
import {connect} from 'react-redux';


import {Avatar,Button, Card, CardHeader, CardMedia, CardActions, IconButton, CardContent, Typography} from '@material-ui/core';
import {AccountCircle, MoreVert, Favorite, Share} from '@material-ui/icons';

import IconLike from './IconLike';


const Post = ({post, user}) => {
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

                    <IconButton aria-label="share">
                        <Share />
                    </IconButton>
                    
                </CardActions>
            </Card>
        
    );
}


const stateToProps = state => {
    return({
        user:state.user
    });
}

export default connect(stateToProps, null)(Post);