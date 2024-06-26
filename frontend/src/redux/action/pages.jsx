import { SET_CURRENT_PAGE, SET_PAGE, SET_SEARCHING } from "./type";
import { useLocation } from "react-router-dom";

export const setPage = (page) => (dispatch) => {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const pageParam = queryParams.get("page");

  dispatch({
    type: "SET_PAGE",
    page,
  });
};

export const setCurrentPage = (currentPage, page) => (dispatch) => {
  dispatch({
    type: "SET_CURRENT_PAGE",
    currentPage,
    page,
  });
};

export const setSearching = (searching) => (dispatch) => {
  dispatch({
    type: "SET_SEARCHING",
    payload: searching
  });
};
