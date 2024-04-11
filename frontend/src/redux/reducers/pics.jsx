import {
  FETCH_DATA_START,
  PICS_START,
  PICS_FAIL,
  PICS_SUCCESS,
  TAGS_START,
  TAGS_SUCCESS,
  TAGS_FAIL,
  TAG_PICS_START,
  TAG_PICS_FAIL,
  TAG_PICS_SUCCESS,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  RESET_PARAMETER,
  SET_Q,
  RESET_SIDE_BAR,
  HOLD_SIDE_BAR,
  AUTHOR_PICS_SUCCESS,
  AUTHOR_PICS_FAIL,
  SET_AUTHOR,
  SAVED_PICS_SUCCESS,
  SAVED_PICS_FAIL,
  SAVE_SUCCESS,
  SAVE_FAIL,
  LIKE_SUCCESS,
  LIKE_FAIL,
  DETAIL_START,
  DETAIL_SUCCESS,
  DETAIL_FAIL,
  RANDOM_START,
  RANDOM_SUCCESS,
  RANDOM_FAIL,
  TOP_START,
  TOP_SUCCESS,
  TOP_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  TAG_SUGGESTION_SUCCESS,
  TAG_SUGGESTION_FAIL,
} from "../action/type";

const initialState = {
  pics_loading: true,
  pics: [],

  detail_loading: true,
  detail: null,

  tags_loading: true,
  tags: [], // All tags

  taged_loading: true,
  taged: [], // All pics with a certain tag

  searched_loading: true,
  searched: [],

  q: null,
  side_status: true,
  side_holder: true,
  authorPics: [],
  authorName: null,
  authorImage: null,
  savedPics: [],
  loading: true,
  tag_suggestion: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TAG_PICS_START:
    case TOP_START:
    case RANDOM_START:
    case PICS_START:
    case FETCH_DATA_START:
      return {
        ...state,
        pics_loading: true,
      };
    case DETAIL_START:
      return {
        ...state,
        detail_loading: true,
      }
    case DETAIL_SUCCESS:
      return {
        ...state,
        detail_loading: false,
        detail: payload,
      };
    case TAGS_SUCCESS:
      return {
        ...state,
        tags_loading: false,
        tags: payload,
      };
    case LIKE_SUCCESS:
    case SAVE_SUCCESS:
      return {
        ...state,
      };
    case SAVED_PICS_SUCCESS:
      return {
        ...state,
        loading: false,
        savedPics: payload,
      };
    case AUTHOR_PICS_SUCCESS:
      return {
        ...state,
        loading: false,
        authorPics: payload,
      };
    case SET_AUTHOR:
      return {
        ...state,
        authorName: payload.username,
        authorImage: payload.image,
      };
    case TAG_SUGGESTION_SUCCESS:
      return {
        ...state,
        tag_suggestion: payload,
      };
    case SET_Q:
      return {
        ...state,
        q: payload, // Reset the parameter to its initial value.
      };
    case RESET_SIDE_BAR:
      return {
        ...state,
        side_status: !state.side_status,
      };
    case HOLD_SIDE_BAR:
      return {
        ...state,
        side_holder: false,
      };
    case RESET_PARAMETER:
      return {
        ...state,
        searched: initialState, // Reset the parameter to its initial value.
      };
    case TOP_SUCCESS:
      return {
        ...state,
        pics_loading: false,
        pics: payload,
      };
    case RANDOM_SUCCESS:
      return {
        ...state,
        pics_loading: false,
        pics: payload,
      };
    case PICS_SUCCESS:
      return {
        ...state,
        pics_loading: false,
        pics: payload,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searched: payload,
      };
    case TAG_PICS_SUCCESS:
      return {
        ...state,
        taged_loading: false,
        taged: payload,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
      };
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
        ...state,
      };
    default:
      return state;
  }
}
