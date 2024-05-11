import axios from "axios";
import {
  FETCH_DATA_START,
  SET_Q,
  SET_TOP_RANGE,
  RESET_SIDE_BAR,
  RESET_PICS_ITEMS,
  HOLD_SIDE_BAR,
  LATEST_PICS_START,
  LATEST_PICS_SUCCESS,
  LATEST_PICS_FAIL,
  RANDOM_PICS_START,
  RANDOM_PICS_SUCCESS,
  RANDOM_PICS_FAIL,
  TOP_PICS_START,
  TOP_PICS_SUCCESS,
  TOP_PICS_FAIL,
  HOT_PICS_START,
  HOT_PICS_SUCCESS,
  HOT_PICS_FAIL,
  TAGS_START,
  TAGS_SUCCESS,
  TAGS_FAIL,
  TAG_PICS_START,
  TAG_PICS_SUCCESS,
  TAG_PICS_FAIL,
  CREATE_PICS_SUCCESS,
  CREATE_PICS_FAIL,
  PICS_UPLOAD_PROGRESS,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  SEARCH_CLEAR,
  RESET_PARAMETER,
  AUTHOR_PICS_SUCCESS,
  AUTHOR_PICS_FAIL,
  SET_AUTHOR,
  SAVED_PICS_FAIL,
  SAVED_PICS_SUCCESS,
  SAVE_SUCCESS,
  SAVE_FAIL,
  LIKE_SUCCESS,
  LIKE_FAIL,
  DETAIL_START,
  DETAIL_SUCCESS,
  DETAIL_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  TAG_SUGGESTION_SUCCESS,
  TAG_SUGGESTION_FAIL,
} from "./type";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const notifyproblem = (res) =>
  toast(`${res.data.error}`, {
    type: "error",
  });

const notifysuccess = (res) =>
  toast(`${res.data.success}`, {
    type: "info",
  });

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
const apiUrl = import.meta.env.VITE_API_URL;

export const resetPicsItems = () => async (dispatch) => {
    dispatch ({
      type: RESET_PICS_ITEMS
    })
}

const fetchPicsData = async (url, type, dispatch) => {
  dispatch({ type: `${type}_PICS_START` });
  try {
    const res = await axios.get(url, config);
    if (res.data.error) {
      dispatch({ type: `${type}_PICS_FAIL` });
    } else {
      dispatch({ type: `${type}_PICS_SUCCESS`, payload: res.data });
    }
  } catch (err) {
    dispatch({ type: `${type}_PICS_FAIL`, err: err });
  }
};


export const randomPics = (url) => async (dispatch) => {
    await fetchPicsData(url, 'RANDOM', dispatch);
};

export const latestPics = (url) => async (dispatch) => {
    await fetchPicsData(url, 'LATEST', dispatch);
};

export const topPics = (url) => async (dispatch) => {
    await fetchPicsData(url, 'TOP', dispatch);
};

export const hotPics = (url) => async (dispatch) => {
    await fetchPicsData(url, 'HOT', dispatch);
};


export const detail = (postId, setZoom_) => async (dispatch) => {
  const url = `${apiUrl}/api-post/${postId}/`;
  try {
    dispatch({ type: DETAIL_START });
    const res = await axios.get(url, config);
    if (res.data.error) {
      dispatch({
        type: DETAIL_FAIL,
      });
    } else {
      setZoom_("showcase-norm");
      dispatch({
        type: DETAIL_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: DETAIL_FAIL,
    });
  }
};

// Get a list of all available tags
export const tags = () => async (dispatch) => {
  const url = `${apiUrl}/api-tags/`;
  try {
    dispatch({ type: TAGS_START });
    const res = await axios.get(url, config);
    if (res.data.error) {
      dispatch({
        type: TAGS_FAIL,
      });
    } else {
      dispatch({
        type: TAGS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: TAGS_FAIL,
    });
  }
};

export const sideBarStatus = () => ({
  type: RESET_SIDE_BAR,
});

export const sideBarHolder = () => ({
  type: HOLD_SIDE_BAR,
});

export const resetParameter = () => ({
  type: RESET_PARAMETER,
});

export const setQ = (q) => ({
  type: SET_Q,
  payload: q,
});

export const setTopRange = (topRange) => (dispatch) => {
  dispatch({
    type: SET_TOP_RANGE,
    payload: topRange,
  })
};

export const clearQueryString = () => ({
  type: SEARCH_CLEAR,
});

export const setAuthor = (username, image) => ({
  type: SET_AUTHOR,
  payload: { username, image },
});

export const search = (url) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_START });
    const res = await axios.get(url, config);
    if (res.data.error) {
      dispatch({
        type: SEARCH_FAIL,
      });
    } else {
      dispatch({
        type: SEARCH_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: SEARCH_FAIL,
    });
  }
};

// Get all pics with a certain TAG
export const tagpics = (url) => async (dispatch) => {
  try {
    dispatch({ type: TAG_PICS_START });
    const res = await axios.get(url, config);
    if (res.data.error) {
      dispatch({
        type: TAG_PICS_FAIL,
      });
    } else {
      dispatch({
        type: TAG_PICS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: TAG_PICS_FAIL,
    });
  }
};

export const createpics = (setLoading, image, tags) => async (dispatch) => {
  const config_ = {
    headers: {
      "content-type": "multipart/form-data",
      // "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentCompleted = Math.round((loaded / total) * 100);
      dispatch({
        type: PICS_UPLOAD_PROGRESS,
        payload: percentCompleted,
      });
    },
  };

  const body = JSON.stringify({ tags });

  try {
    const res = await axios.post(`${apiUrl}/api-create`, body, config_);
    if (res.data.error) {
      dispatch({
        type: CREATE_PICS_FAIL,
      });
    } else {
      dispatch({
        type: CREATE_PICS_SUCCESS,
        payload: res.data,
      });
      setLoading(false);
    }
  } catch (err) {
    dispatch({
      type: CREATE_PICS_FAIL,
    });
  }
};

export const authorPics = (url) => async (dispatch) => {
  try {
    // dispatch({ type: FETCH_DATA_START });
    const res = await axios.get(url, config);
    if (res.data.error) {
      dispatch({
        type: AUTHOR_PICS_FAIL,
      });
    } else {
      dispatch({
        type: AUTHOR_PICS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHOR_PICS_FAIL,
    });
  }
};

export const savedpics = (url) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DATA_START });

    const res = await axios.get(url, config);
    if (res.data.error) {
      dispatch({
        type: SAVED_PICS_FAIL,
      });
    } else {
      dispatch({
        type: SAVED_PICS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: SAVED_PICS_FAIL,
    });
  }
};

export const save = (pic_id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  const body = JSON.stringify({
    withCredentials: true,
  });
  try {
    const res = await axios.post(
      `${apiUrl}/${pic_id}/api-save-pic/`,
      body,
      config,
    );
    if (res.data.success) {
      notifysuccess(res);
      dispatch({
        type: SAVE_SUCCESS,
        payload: res.data.username,
      });
    } else {
      notifyproblem(res);
      dispatch({
        type: SAVE_FAIL,
      });
    }
  } catch {
    dispatch({
      type: SAVE_FAIL,
    });
  }
};

export const delete_pic = (pic_id) => async (dispatch) => {
  const config = {
    headers: {
      // "Accept": "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
    withCredentials: true,
  };

  try {
    const res = await axios.delete(`${apiUrl}/${pic_id}/api-delete/`, config);
    if (res.data.success) {
      notifysuccess(res);
      dispatch({
        type: DELETE_SUCCESS,
      });
    } else {
      notifyproblem(res);
      dispatch({
        type: DELETE_FAIL,
      });
    }
  } catch {
    dispatch({
      type: DELETE_FAIL,
    });
  }
};

export const like = (pic_id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  const body = JSON.stringify({
    withCredentials: true,
  });
  try {
    const res = await axios.post(
      `${apiUrl}/${pic_id}/api-like-pic/`,
      body,
      config,
    );
    if (res.data.success) {
      notifysuccess(res);
      dispatch({
        type: LIKE_SUCCESS,
        payload: res.data.username,
      });
    } else {
      notifyproblem(res);
      dispatch({
        type: LIKE_FAIL,
      });
    }
  } catch {
    dispatch({
      type: LIKE_FAIL,
    });
  }
};

export const tag_suggestion = (qs) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // const body = JSON.stringify({
  //     "withCredentials": true
  // })

  try {
    const res = await axios.get(
      `${apiUrl}/api-tag-suggestion/?q=${qs}`,
      config,
    );
    if (res.data.error) {
      dispatch({
        type: TAG_SUGGESTION_FAIL,
      });
    } else {
      dispatch({
        type: TAG_SUGGESTION_SUCCESS,
        payload: res.data,
      });
    }
  } catch {
    dispatch({
      type: TAG_SUGGESTION_FAIL,
    });
  }
};


