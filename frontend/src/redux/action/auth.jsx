import axios from "axios"
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, CHECK_AUTH_SUCCESS, CHECK_AUTH_FAIL } from '../action/type'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

const notify = () => toast('invalid password or username!', {
    type: "error",
});
const notifyregisterproblem = (res) => toast(`${res.data.error}`, {
    type: "error",
});

const apiUrl = import.meta.env.VITE_API_URL;
export const checkauth = () => async dispatch => {

    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/checkauth/`, config)
        if (res.data.error || res.data.isAuthenticated === 'error') {
            dispatch({
                type: CHECK_AUTH_FAIL,
                payload: false
            });
        } else if (res.data.isAuthenticated === 'success') {
            dispatch({
                type: CHECK_AUTH_SUCCESS,
                payload: true
            })
        } else {
            dispatch({
                type: CHECK_AUTH_FAIL,
                payload: false
            });
        }

    }
    catch (err) {
        dispatch({
            type: CHECK_AUTH_FAIL,
            payload: false
        });
    }
}

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    }
    const body = JSON.stringify({ username, password })
    try {
        const res = await axios.post(`${apiUrl}/api-login/`, body, config)
        if (res.data.success) {
            dispatch({
                type: LOGIN_SUCCESS
            })
        } else {
            notify()
            dispatch({
                type: LOGIN_FAIL
            })
        }
    }
    catch {
        notify()
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logout = () => async dispatch => {
    const config = {
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    };
    const body = JSON.stringify({
        "withCredentials": true
    })
    try {
        const res = await axios.post(`${apiUrl}/api-logout/`, body, config)
        if (res.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res.data.username
            })
        } else {
            dispatch({
                type: LOGOUT_FAIL
            })
        }
    }
    catch {
        dispatch({
            type: LOGOUT_FAIL
        })
    }
}

export const register = (username, email, password, password2) => async dispatch => {



    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, email, password, password2 })
    try {
        const res = await axios.post(`${apiUrl}/api-register/`, body, config)

        if (res.data.success) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: true
            });
        } else {
            notifyregisterproblem(res)
            dispatch({
                type: REGISTER_FAIL,
                payload: false
            });
        }
    }
    catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: false
        })
    }

}
