import { PROFILE_FAIL, PROFILE_SUCCESS, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_DATA_SUCCESS, USER_DATA_FAIL } from "../action/type";



const initialState = {
    username: '',
    email: '',
    image: '',
    user: '',
    user_username: '',
    user_image: '',
    user_cover: '',
    user_email: '',
    loading: true
}


export default function(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case USER_DATA_SUCCESS:
            return {
                ...state,
                user_username: payload.profile.user_u,
                user_email: payload.email,
                user_image: payload.profile.image,
                user_cover: payload.profile.cover,
            }
        case USER_UPDATE_SUCCESS:
        case PROFILE_UPDATE_SUCCESS:
        case PROFILE_SUCCESS:
            return {
                ...state,
                image: payload.profile.image,
                username: payload.username,
                email: payload.email,
                user: payload.profile.user,
                loading: false
            }
        case PROFILE_FAIL:
            return {
                ...state,
                image: '',
                username: '',
                email: ''
            }
        case USER_DATA_FAIL:
        case USER_UPDATE_FAIL:
        case PROFILE_UPDATE_FAIL:
            return { ...state }
        default:
            return state
    }
}
