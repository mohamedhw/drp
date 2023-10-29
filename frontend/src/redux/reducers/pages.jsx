import {SET_PAGE, SET_CURRENT_PAGE} from '../action/type'


const initialState = {
    page: 1,
    currentPage: 1
  };

export default function(state = initialState, action){
    const { type, payload } = action
    switch (type) {
    case 'SET_PAGE':
    return {
        ...state,
        page: action.page,
    };
    case 'SET_CURRENT_PAGE':
    return {
        ...state,
        currentPage: action.currentPage,
    };
    default:
    return state;
}
};
  
