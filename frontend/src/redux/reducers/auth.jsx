import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, CHECK_AUTH_SUCCESS, CHECK_AUTH_FAIL} from '../action/type'


const initialState = {
    isAuthenticated: null,
}


export default function(state=initialState,action){
    const { type, payload } = action
    switch(type){
        case CHECK_AUTH_FAIL:
        case CHECK_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
            return state
        default:
            return state
    }
}