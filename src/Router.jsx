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
            let {data} = await verifyToken({variables:{token}});
            setUser(data.verifyToken);
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
                <Route exact path="/profile/:username">
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