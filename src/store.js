import {createStore} from 'redux';

const initialState = {
    user:null,
    friends:null,
    chats:[]
}

const reducer = (state=initialState, action) => {
    if(action.type === "SET_USER"){
        return({
            ...state,
            user:action.user
        });
    }
    if(action.type === "SET_FRIENDS"){
        return({
            ...state,
            friends : action.friends
        });
    }
    return state;
}

export default createStore(reducer);