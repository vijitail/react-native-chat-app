// feature name
export const LOGIN = `[login]`;

// action types
export const AUTHENTICATE = `${LOGIN} AUTHENTICATE`;
export const SET_AUTH_USER = `${LOGIN} SET_AUTH_USER`;

export const login = (data) => ({
  type: AUTHENTICATE,
  payload: data,
  jwt: null,
});

export const setAuthUser = (user) => ({
  type: SET_AUTH_USER,
  payload: user,
});
