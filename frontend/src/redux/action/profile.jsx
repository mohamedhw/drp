import process from "process";
import axios from "axios"
import { PROFILE_SUCCESS, PROFILE_FAIL, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_DATA_FAIL, USER_DATA_SUCCESS } from './type';
import Cookies from 'js-cookie'

const apiUrl = import.meta.env.VITE_API_URL;

export const profile = () => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api-profile/`, config)
        if(res.data.error){
            dispatch({
                type: PROFILE_FAIL,
            })
        }
        else {
            dispatch({
                type: PROFILE_SUCCESS,
                payload: res.data
            })
        }
    }
    catch(err){
        dispatch({
            type: PROFILE_FAIL
        })
    }
}


export const profile_update = (form_data) => async dispatch => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    };

    const body = form_data
    try{
        
        const res = await axios.put(`${apiUrl}/api-profile-update/`, body, config)


        if (res.data.success){
            dispatch({
                type: PROFILE_UPDATE_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: PROFILE_UPDATE_FAIL
            })
        }

    }
    catch(err){
        dispatch({
            type: PROFILE_UPDATE_FAIL
        })
    }
}


export const user_update = (username, email) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({username, email})
    try{
        
        const res = await axios.put(`${apiUrl}/api-profile-user-update/`, body, config)


        if (res.data.success){
            dispatch({
                type: USER_UPDATE_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: USER_UPDATE_FAIL
            })
        }

    }
    catch(err){
        dispatch({
            type: USER_UPDATE_FAIL
        })
    }
}

export const user_data = (username) => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

    // const body = JSON.stringify({
    //     "withCredentials": true
    // })
    try {
        const res = await axios.get(`${apiUrl}/api-user-profile/${username}/`, config)
        console.log('test', res)
        if(res.data.error){
            dispatch({
                type: USER_DATA_FAIL,
            })
        }
        else {
            dispatch({
                type: USER_DATA_SUCCESS,
                payload: res.data
            })
        }
    }
    catch(err){
        dispatch({
            type: USER_DATA_FAIL
        })
    }
}
