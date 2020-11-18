import {createStore} from 'redux';

const initialState = {
    user:null
}

const reducer = (state=initialState, action) => {
    if(action.type == "SET_USER"){
        return({
            ...state,
            user:action.user
        });
    }
    return state;
}

export default createStore(reducer);