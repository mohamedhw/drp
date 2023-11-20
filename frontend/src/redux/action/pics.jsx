import axios from "axios"
import {
    SET_Q, 
    PICS_SUCCESS, 
    PICS_FAIL, 
    TAG_PICS_SUCCESS, 
    TAG_PICS_FAIL, 
    CREATE_PICS_SUCCESS, 
    CREATE_PICS_FAIL, 
    SEARCH_SUCCESS, 
    SEARCH_FAIL, 
    RESET_PARAMETER,
    AUTHOR_PICS_SUCCESS,
    AUTHOR_PICS_FAIL,
    SET_AUTHOR,
    SAVED_PICS_FAIL,
    SAVED_PICS_SUCCESS
} from './type'

const config = {
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
};
const apiUrl = import.meta.env.VITE_API_URL;

export const pics = (url, setLoading) => async dispatch => {


    try {
        const res = await axios.get(url, config)
        if(res.data.error){
            dispatch({
                type: PICS_FAIL,
            })
        }
        else {
            dispatch({
                type: PICS_SUCCESS,
                payload: res.data
            })
        }
    }
    catch(err){
        dispatch({
            type: PICS_FAIL
        });
    } finally {
        setLoading(false); // Set loading to false when data fetching is complete
    }
}


export const resetParameter = () => ({
    type: RESET_PARAMETER,
});

export const setQ = (q) => ({
    type: SET_Q,
    payload: q
});

export const setAuthor = (username, image) => ({
    type: SET_AUTHOR,
    payload: {username, image}
});

export const search = (url, setLoading) => async dispatch => {
    try {
        const res = await axios.get(url, config)
        if(res.data.error){
            dispatch({
                type: SEARCH_FAIL,
            })
        }
        else {
            console.log(res.data)
            dispatch({
                type: SEARCH_SUCCESS,
                payload: res.data
            })
        }
    }
    catch(err){
        dispatch({
            type: SEARCH_FAIL
        });
    } finally {
        setLoading(false); // Set loading to false when data fetching is complete
    }
}
export const tagpics = (url, setLoading) => async dispatch => {
    

    try {
        console.log("test")

        const res = await axios.get(url, config)
        if(res.data.error){
            dispatch({
                type: TAG_PICS_FAIL,
            })
        }
        else {
            dispatch({
                type: TAG_PICS_SUCCESS,
                payload: res.data
            })
            setLoading(false)
        }
    }
    catch(err){
        console.log("test1")

        dispatch({
            type: TAG_PICS_FAIL
        })
    }
}

export const createpics = (setLoading, title, body, image, tags) => async dispatch => {
    
    const config_ = {
        headers: {
            'content-type': 'multipart/form-data',
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({title, body, image, tags})

    try {
        const res = await axios.get(`${apiUrl}/api-create`, body, config_)
        if(res.data.error){
            dispatch({
                type: CREATE_PICS_FAIL,
            })
        }
        else {
            dispatch({
                type: CREATE_PICS_SUCCESS,
                payload: res.data
            })
            setLoading(false)
        }
    }
    catch(err){
        dispatch({
            type: CREATE_PICS_FAIL
        })
    }
}


export const authorpics = (url) => async dispatch => {
    

    try {
        const res = await axios.get(url, config)
        if(res.data.error){
            dispatch({
                type: AUTHOR_PICS_FAIL,
            })
        }
        else {
            dispatch({
                type: AUTHOR_PICS_SUCCESS,
                payload: res.data
            })
        }
    }
    catch(err){
        dispatch({
            type: AUTHOR_PICS_FAIL
        })
    }
}


export const savedpics = (url) => async dispatch => {
    

    try {
        const res = await axios.get(url, config)
        if(res.data.error){
            dispatch({
                type: SAVED_PICS_FAIL,
            })
        }
        else {
            dispatch({
                type: SAVED_PICS_SUCCESS,
                payload: res.data
            })
        }
    }
    catch(err){
        dispatch({
            type: SAVED_PICS_FAIL
        })
    }
}