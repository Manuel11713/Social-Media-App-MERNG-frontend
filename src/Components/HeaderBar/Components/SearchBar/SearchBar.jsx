import React,{useState, useEffect, forwardRef} from 'react';
import {Link} from 'react-router-dom';
import {InputBase, Typography} from '@material-ui/core';

import {gql, useMutation} from '@apollo/client';

import SearchIcon from '@material-ui/icons/Search';

import './SearchBar.css';
import { useRef } from 'react';

const Mutation_GETUSERS = gql`
    mutation GetUsers($username:String!){
        getUsers(username:$username){
            id,
            username
        }
    }
`;

const ListUsers = forwardRef( ({users},ref) => {

    return(
        <div ref={ref} className="users-list" >
            {users.map(user => {
                return(
                    <Link to={`/profile/${user.id}`} key={user.id}>
                        <div className="item-user" >
                            <Typography variant="body1">{user.username}</Typography>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
})

const SearchBar = () => {
    const [usersFectch, setUsers] = useState(null);
    const [getUsers] = useMutation(Mutation_GETUSERS);
    const refList = useRef(null);

    useEffect(()=>{
        const handleClick = (event) => {

            if (refList.current && !refList.current.contains(event.target)) {
                setUsers(null);
            }
        }
        document.addEventListener("click",handleClick);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click",handleClick);
        };
    })

    const handleChange = async(e) => {
        let username = e.currentTarget.value;
        if(username === '')return setUsers(null);

        let {data} = await getUsers({variables:{username}});
        setUsers(data.getUsers);

    }

    return(
        <div className="searchbar-container">
            
            <SearchIcon style={{alignSelf:'center'}} />
            
            <InputBase
                placeholder="Search…"
                className="inputSearch"
                onChange={handleChange}
            />

            {usersFectch?<ListUsers ref={refList} users={usersFectch} />:null}
            
       </div>        
    )
}

export default SearchBar;