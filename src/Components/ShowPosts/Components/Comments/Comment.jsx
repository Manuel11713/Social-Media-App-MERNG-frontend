import React, { useState } from 'react';
import moment from 'moment';
import {IconButton, Menu , MenuItem, Typography} from '@material-ui/core';
import {AccountCircle, MoreVert} from '@material-ui/icons';

const Comment = ({comment, deleteComment}) => {
    const [anchor, setAnchor] = useState(null);
    const {body, createdAt, username, id } = comment;

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchor(null);
    };
    return(
        <>
        <div className="comment">
            <div className="comment-header">
                <div className="comment-header-user">
                    <IconButton>
                        <AccountCircle/>
                    </IconButton>
                    <Typography className="username-comment" variant="body2">{username}</Typography>
                    <Typography className="time-comment">{moment(createdAt).fromNow()}</Typography>
                </div>
                <IconButton>
                    <MoreVert onClick={handleClick}/>
                </IconButton>
            </div>
            <Typography className="comment-body" variant="body1">{body}</Typography>
        </div>
        <Menu
            id="simple-menu"
            anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
            onClose={handleClose}
            >
            <MenuItem onClick={deleteComment(id)} >Delete comment</MenuItem>
        </Menu>
        </>
    );
}

export default Comment;