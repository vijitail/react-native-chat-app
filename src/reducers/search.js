import {SET_SEARCH_RESULTS} from '../actions/search';

export default (state = [], action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return action.payload;
    default:
      return state;
  }
};
