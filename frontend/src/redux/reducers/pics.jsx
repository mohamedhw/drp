import { 
    PICS_FAIL,
    PICS_SUCCESS, 
    TAG_PICS_FAIL, 
    TAG_PICS_SUCCESS, 
    SEARCH_SUCCESS, 
    SEARCH_FAIL, 
    RESET_PARAMETER, 
    SET_Q,
} from "../action/type";



const initialState = {
    pics:[],
    taged:[],
    searched:[],
    q:null,
}

export default function(state=initialState,action){
    const { type, payload } = action
    switch(type){
        case SET_Q:
            return {
                ...state,
                q: payload, // Reset the parameter to its initial value.
            };
        case RESET_PARAMETER:
            return {
              ...state,
              searched: initialState, // Reset the parameter to its initial value.
            };
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