import React, {useState} from 'react';
import {connect} from 'react-redux';
import {gql, useQuery, useMutation} from '@apollo/client';
import {useParams} from 'react-router-dom';


import {Button} from '@material-ui/core';
import './ADC.css';
import { useEffect } from 'react';


const QUERY_GETUSERBYID = gql`
    query GetUserbyID($userid:ID!){
        getUserbyID(userid:$userid){
            friends{
                userid
            }
        }
    }
`;

const MUTATION_ADDFRIEND = gql`
    mutation AddFriend($userid:ID!){
        addFriend(userid:$userid)
    }
`;

const MUTATION_REMOVEFRIEND = gql`
    mutation RemoveFriend($userid:ID!){
        removeFriend(userid:$userid)
    }
`;

const AddFriend = ({userid, setFriend}) => {
    const [addFriend] = useMutation(MUTATION_ADDFRIEND);

    const handleCLick = async () => {
        await addFriend({variables:{userid}});
        setFriend(true);
    }
    return(
        <Button variant="contained" color="primary" onClick={handleCLick}>
            Add Friend
        </Button>
    );
}

const RemoveFriend = ({userid, setFriend}) => {
    const [removeFriend] = useMutation(MUTATION_REMOVEFRIEND);

    const handleCLick = async () => {
        await removeFriend({variables:{userid}});
        setFriend(false)
    }
    return(
        <Button variant="contained" color="secondary" onClick={handleCLick}>
            Remove Friend
        </Button>
    );
}
const ADC = ({user}) => {
    const {userid} = useParams();
    const {data} = useQuery(QUERY_GETUSERBYID,{variables:{userid}});
   
    const [friend, setFriend] = useState(false);

    
    //There are no friends for this user
    
    useEffect(()=>{
        if(!data)return;
        if(data.getUserbyID.friends){
            let idxFriend =  data.getUserbyID.friends.find(friend => friend.userid === user.id);
            if(idxFriend)setFriend(true);
        }
    },[data]);
    if(userid === user.id)return <div>self profile</div>
    if(!data)return <div>loading</div>

    return(
        <div className="ADC-button">
            {
                friend ?
                <RemoveFriend userid={userid} setFriend={setFriend}/> : 
                <AddFriend userid={userid} setFriend={setFriend}/>
            }
        </div>
    );
}

const stateToProps = state => {
    return({
        user: state.user
    });
}

export default connect(stateToProps, null)(ADC);