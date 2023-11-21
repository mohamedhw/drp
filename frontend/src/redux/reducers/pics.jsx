import { 
    PICS_FAIL,
    PICS_SUCCESS, 
    TAG_PICS_FAIL, 
    TAG_PICS_SUCCESS, 
    SEARCH_SUCCESS, 
    SEARCH_FAIL, 
    RESET_PARAMETER, 
    SET_Q,
    AUTHOR_PICS_SUCCESS,
    AUTHOR_PICS_FAIL,
    SET_AUTHOR,
    SAVED_PICS_SUCCESS,
    SAVED_PICS_FAIL,
    SAVE_SUCCESS,
    SAVE_FAIL,
    LIKE_SUCCESS,
    LIKE_FAIL,
    TAGS_SUCCESS,
    TAGS_FAIL
} from "../action/type";



const initialState = {
    pics:[],
    tags: [],
    taged:[],
    searched:[],
    q:null,
    authorPics:[],
    authorName:null,
    authorImage:null,
    savedPics: [],
}

export default function(state=initialState,action){
    const { type, payload } = action
    switch(type){
        case TAGS_SUCCESS:
            return {
                ...state,
                tags: payload
            }
        case LIKE_SUCCESS:
        case SAVE_SUCCESS:
            return {
                ...state,
            }
        case SAVED_PICS_SUCCESS:
            return {
                ...state,
                savedPics: payload
            }
        case AUTHOR_PICS_SUCCESS:
            return {    
                ...state,
                authorPics: payload
            }
        case SET_AUTHOR:
            return {
                ...state,
                authorName: payload.username,
                authorImage: payload.image
            }
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
        case TAGS_FAIL:
        case LIKE_FAIL:
        case PICS_FAIL:
        case SEARCH_FAIL:
        case TAG_PICS_FAIL:
        case SAVED_PICS_FAIL:
        case SAVE_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}