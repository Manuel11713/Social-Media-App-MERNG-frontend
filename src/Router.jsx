import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {gql, useMutation} from '@apollo/client';


//Views 
import Home from './Views/Home/Home';
import Register from './Views/Register/Register';


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
            let {data} = await verifyToken({variables:{token}});
            setUser(data.verifyToken);
        };
        fetchData();
    },[setUser, token, verifyToken]);

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {!user ? <Redirect to="/feed" /> : <Home/>}
                </Route>
                <Route exact path="/regist  er" component={Register}/>
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