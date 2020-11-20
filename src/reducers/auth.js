import {SET_AUTH_USER} from '../actions/login';
import {LOGOUT} from '../actions/logout';

const INITIAL_STATE = {isAuth: false};

export default (authUser = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        token: action.payload.token,
        user: action.payload.user,
        isAuth: true,
      };
    case LOGOUT:
      return {
        isAuth: false,
      };
    default:
      return authUser;
  }
};
