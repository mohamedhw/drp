import { PICS_FAIL, PICS_SUCCESS, TAG_PICS_FAIL, TAG_PICS_SUCCESS } from "../action/type";



const initialState = {
    pics:[],
    taged:[]
}

export default function(state=initialState,action){
    const { type, payload } = action
    switch(type){
        case PICS_SUCCESS:
            return {
                ...state,
                pics: payload
            }
        case TAG_PICS_SUCCESS:
            return {
                ...state,
                taged: payload
            }
        case PICS_FAIL:
        case TAG_PICS_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}