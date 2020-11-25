import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {gql, useMutation} from '@apollo/client';


//Views 
import Home from './Views/Home/Home';
import Register from './Views/Register/Register';
import Login from './Views/Login/Login';
import Feed from './Views/Feed/Feed';
import Profile from './Views/Profile/Profile';
import Chat from './Views/Chat/Chat';


const VERIFYTOKEN_MUTATION = gql`
    mutation VerifyToken($token:String){
        verifyToken(token: $token){
            id, username, email
        }
    }   
`;

const Router = ({user, setUser}) => {

    let token = localStorage.getItem('token');


    const [verifyToken] = useMutation(VERIFYTOKEN_MUTATION);

    useEffect(()=>{
        let fetchData = async () => {
            if(!token) return;
            try{
                let {data} = await verifyToken({variables:{token}});
                setUser(data.verifyToken);
            }catch(err){
            }
        };
        fetchData();
    },[setUser, token, verifyToken]);

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {user ? <Redirect to="/feed" /> : <Home/>}
                </Route>
                <Route exact path="/login" >
                    {user ? <Redirect to="/feed" /> : <Login/>}
                </Route>
                <Route exact path="/register" >
                    {user ? <Redirect to="/feed" /> : <Register/>}
                </Route>
                
                <Route exact path="/chat">
                    {user ? <Chat/> : <Home/>}
                </Route>

                <Route exact path="/profile/:userid">
                    {user ? <Profile/> : <Home/>}
                </Route>
                <Route exact path="/feed">
                    {user ? <Feed/> : <Home/>}
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

const stateToProps = state => {
    return({
        user:state.user
    });
}

const dispatchToProps = dispatch => {
    return({
        setUser(user){
            dispatch({
                type:"SET_USER",
                user
            });
        }
    });
}
export default connect(stateToProps, dispatchToProps)(Router);