import { PICS_FAIL, PICS_SUCCESS, TAG_PICS_FAIL, TAG_PICS_SUCCESS, SEARCH_SUCCESS, SEARCH_FAIL } from "../action/type";



const initialState = {
    pics:[],
    taged:[],
    searched:[],
}

export default function(state=initialState,action){
    const { type, payload } = action
    switch(type){
        case PICS_SUCCESS:
            return {
                ...state,
                pics: payload
            }
        case SEARCH_SUCCESS:
            return {
                ...state,
                searched: payload
            }
        case TAG_PICS_SUCCESS:
            return {
                ...state,
                taged: payload
            }
        case PICS_FAIL:
        case SEARCH_FAIL:
        case TAG_PICS_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}