import {LOGIN, AUTHENTICATE, setAuthUser} from '../../actions/login';
import {API_ERROR, API_SUCCESS, apiRequest} from '../../actions/api';
import {setLoader} from '../../actions/ui';
import {setError} from '../../actions/error';

import {setToken, setUser} from '../../utils/auth';

import {API_URL} from '../../constants/server';

const LOGIN_URL = `${API_URL}/auth/login`;

export const loginMiddleware = () => (next) => (action) => {
  next(action);

  switch (action.type) {
    case AUTHENTICATE:
      next(
        apiRequest({
          body: action.payload,
          method: 'POST',
          url: LOGIN_URL,
          feature: LOGIN,
          jwt: action.jwt,
        }),
      );
      next(setLoader({state: true, feature: LOGIN}));
      break;

    case `${LOGIN} ${API_SUCCESS}`:
      next(setAuthUser(action.payload));
      next(setLoader({state: false, feature: LOGIN}));
      setToken(action.payload.token);
      setUser(action.payload.user);
      break;

    case `${LOGIN} ${API_ERROR}`:
      next(setError({message: action.payload, feature: LOGIN}));
      next(setLoader({state: false, feature: LOGIN}));
      break;
  }
};
