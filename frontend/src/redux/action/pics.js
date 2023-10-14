import axios from "axios"
import {PICS_SUCCESS, PICS_FAIL, TAG_PICS_SUCCESS, TAG_PICS_FAIL} from './type'
// import process from "process";

const config = {
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
};
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
            setLoading(false)
        }
    }
    catch(err){
        dispatch({
            type: PICS_FAIL
        })
    }
}

export const tagpics = (url, setLoading) => async dispatch => {
    

    try {
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
        dispatch({
            type: TAG_PICS_FAIL
        })
    }
}

