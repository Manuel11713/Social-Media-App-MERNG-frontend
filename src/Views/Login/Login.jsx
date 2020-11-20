import React,{useState} from 'react';
import {connect} from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import {Typography, TextField, Button} from '@material-ui/core';


const LOGIN_MUTATION = gql`
    mutation Login($password:String!, $email:String!){ 
        login(
            
            email: $email
            password: $password
            
        ){
            id
            token
            username
        }
    }
`;

const Login = ({setUser}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [login] = useMutation(LOGIN_MUTATION);
    
    let history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        if(!email || !password)return;

        let {data} = await login({variables:{email, password}});

        let {id, token, username} = data.login;
        
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
                    <TextField className="textfield-register" type="email" label="email" onChange={(e)=>setEmail(e.currentTarget.value)}/>
                    <TextField className="textfield-register" type="password" label="password" onChange={(e)=>setPassword(e.currentTarget.value)}/>
                
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

export default connect(null, dipatchToProps)(Login);