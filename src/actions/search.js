// feature name
export const SEARCH = `[search]`;

// action types
export const SEARCH_USERS = `${SEARCH} SEARCH_USERS`;
export const SET_SEARCH_RESULTS = `${SEARCH} SET_SEARCH_RESULTS`;

// action creators
export const searchUsers = (query) => ({
  type: SEARCH_USERS,
  query,
});

export const setSearchResults = (users) => ({
  type: SET_SEARCH_RESULTS,
  payload: users,
});
