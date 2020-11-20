import React,{useState} from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux';

import './Register.css';

const REGISTER_MUTATION = gql`
    mutation Register($username:String!, $password:String!, $birthday:String!, $email:String!){ 
        register(
            registerInput: {
            username:$username
            email: $email
            password: $password
            birthday: $birthday
            }
        ){
            id
            token
            email
            username
        }
    }
`;

const Register = ({setUser}) => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [birthday, setBirthday] = useState(null);

    let history = useHistory();

    const [register] = useMutation(REGISTER_MUTATION);

    const handleSubmit =  async (event) => {
        event.preventDefault();
        if(!username || !email || !password || !birthday)return; 

        let {data} = await register({
            variables:{username, email, password, birthday}
        });
        let {id, token} = data.register;
        
        localStorage.setItem('token',token);

        let user = {
            id,
            email,
            username
        };

        setUser(user);
        history.push('/feed');

    }
    return(
        <div id="register-container">
            <div id="form-register-container">
                <Typography variant="h4" style={{textAlign:'center'}}>Register</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField className="textfield-register" label="username" onChange={(e)=>setUsername(e.currentTarget.value)}/>
                    <TextField className="textfield-register" type="email" label="email" onChange={(e)=>setEmail(e.currentTarget.value)}/>
                    <TextField className="textfield-register" type="password" label="password" onChange={(e)=>setPassword(e.currentTarget.value)}/>
                    <TextField
                        label="birthday"
                        type="date"
                        className="textfield-register"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e)=>setBirthday(e.currentTarget.value)}
                    />
                    <Button className="submit-register" variant="contained" color="primary" type="submit">Register</Button>
                </form>
            </div>
        </div>
    );
}

const dipatchToProps = dispatch => {
    return({
        setUser(user){
            dispatch({
                type:"SET_USER",
                user
            });
        }
    });
}

export default connect(null, dipatchToProps)(Register);