import {SET_ERROR, REMOVE_ERROR} from '../actions/error';

const initState = {};

export default (errors = initState, action) => {
  switch (true) {
    case action.type.includes(SET_ERROR):
      return {...errors, ...action.payload};
    case action.type.includes(REMOVE_ERROR):
      return [];
    default:
      return errors;
  }
};
