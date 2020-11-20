// action types
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';

// action creators
export const apiRequest = ({body, method, url, feature, jwt}) => ({
  type: `${feature} ${API_REQUEST}`,
  payload: body,
  meta: {method, url, feature, jwt},
});

export const apiSuccess = ({response, feature, requestData}) => ({
  type: `${feature} ${API_SUCCESS}`,
  payload: response,
  meta: {feature},
  requestData,
});

export const apiError = ({error, feature, requestData}) => ({
  type: `${feature} ${API_ERROR}`,
  payload: error,
  meta: {feature},
  requestData,
});
