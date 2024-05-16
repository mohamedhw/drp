import { SET_PAGE, SET_CURRENT_PAGE, SET_SEARCHING } from "../action/type";

const initialState = {
  page: null,
  currentPage: null,
  searching: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case "SET_SEARCHING":
      return {
        searching: payload
      };
    default:
      return state;
  }
}
