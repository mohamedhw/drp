import { 
    FETCH_DATA_START,
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
    TAGS_FAIL,
    DETAIL_FAIL,
    DETAIL_SUCCESS,
    RANDOM_FAIL,
    RANDOM_SUCCESS,
    TOP_FAIL,
    TOP_SUCCESS,
    DELETE_SUCCESS,
    DELETE_FAIL,
    TAG_SUGGESTION_FAIL,
    TAG_SUGGESTION_SUCCESS
} from "../action/type";



const initialState = {
    pics:[],
    top: [],
    random: [],
    tags: [],
    taged:[],
    searched:[],
    q:null,
    authorPics:[],
    authorName:null,
    authorImage:null,
    savedPics: [],
    detail: null,
    loading: true,
    tag_suggestion: []
}

export default function(state=initialState,action){
    const { type, payload } = action
    switch(type){
        case FETCH_DATA_START:
            return {
              ...state,
              loading: true,
            }
        case DETAIL_SUCCESS:
            return {
                ...state,
                detail: payload
            }
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
                loading: false,
                savedPics: payload
            }
        case AUTHOR_PICS_SUCCESS:
            return {    
                ...state,
                loading: false,
                authorPics: payload
            }
        case SET_AUTHOR:
            return {
                ...state,
                authorName: payload.username,
                authorImage: payload.image
            }
        case TAG_SUGGESTION_SUCCESS:
            return {
                ...state,
                tag_suggestion: payload
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
            }
        case TOP_SUCCESS:
            return {
                ...state,
                loading: false,
                top: payload
            }
        case RANDOM_SUCCESS:
            return {
                ...state,
                loading: false,
                random: payload
            }
        case PICS_SUCCESS:
            return {
                ...state,
                loading: false,
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
        case DELETE_SUCCESS:
            return {
                ...state
            }
        case RANDOM_FAIL:
        case AUTHOR_PICS_FAIL:
        case TOP_FAIL:
        case DETAIL_FAIL:
        case TAGS_FAIL:
        case LIKE_FAIL:
        case PICS_FAIL:
        case SEARCH_FAIL:
        case TAG_PICS_FAIL:
        case SAVED_PICS_FAIL:
        case SAVE_FAIL:
        case DELETE_FAIL:
        case TAG_SUGGESTION_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}
