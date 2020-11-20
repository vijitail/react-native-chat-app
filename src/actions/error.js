// action types
export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

// action creators
export const setError = ({message, feature}) => ({
  type: `${feature} ${SET_ERROR}`,
  payload: message,
  meta: {feature},
});

export const removeError = () => ({
  type: REMOVE_ERROR,
});
