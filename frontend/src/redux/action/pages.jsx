import {SET_CURRENT_PAGE, SET_PAGE} from './type'

export const setPage = (page) => dispatch =>{
    dispatch ({
      type: 'SET_PAGE',
      page,
    });
  };
  
export const setCurrentPage = (currentPage, page) => dispatch =>{
    dispatch ({
        type: 'SET_CURRENT_PAGE',
        currentPage,
        page
    })
};