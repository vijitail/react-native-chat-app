import {SEARCH_USERS, SEARCH, setSearchResults} from '../../actions/search';
import {API_ERROR, API_SUCCESS, apiRequest} from '../../actions/api';
import {setLoader} from '../../actions/ui';
import {setError} from '../../actions/error';

import {API_URL} from '../../constants/server';

const URL = `${API_URL}/users/search`;

export const searchMiddleware = () => (next) => (action) => {
  next(action);

  switch (action.type) {
    case SEARCH_USERS:
      next(
        apiRequest({
          url: `${URL}?query=${action.query}`,
          method: 'GET',
          jwt: action.jwt,
          feature: SEARCH,
        }),
      );
      next(setLoader({state: true, feature: SEARCH}));
      break;
    case `${SEARCH} ${API_SUCCESS}`:
      next(setSearchResults(action.payload));
      next(setLoader({state: false, feature: SEARCH}));
      break;

    case `${SEARCH} ${API_ERROR}`:
      next(setError({message: action.payload, feature: SEARCH}));
      next(setLoader({state: false, feature: SEARCH}));
      break;
  }
};
