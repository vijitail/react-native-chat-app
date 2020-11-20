import axios from 'axios';
import {API_REQUEST, apiError, apiSuccess} from '../../actions/api';

export const apiMiddleware = ({dispatch}) => (next) => (action) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const {url, method, feature, jwt} = action.meta;
    axios({
      method,
      url,
      data: action.payload,
      headers: {
        Authorization: 'Bearer ' + jwt,
        // 'Content-Type': 'multipart/form-data'
      },
    })
      .then(({data, ...res}) => {
        const requestData =
          res.config && res.config.data ? JSON.parse(res.config.data) : null;
        dispatch(
          apiSuccess({
            response: data,
            feature,
            requestData,
          }),
        );
      })
      .catch((error) => {
        console.log(error);
        const requestData =
          error.config && error.config.data
            ? JSON.parse(error.config.data)
            : null;
        if (error.response)
          dispatch(
            apiError({error: error.response.data, feature, requestData}),
          );
        else
          dispatch(
            apiError({
              error: {message: 'Something went wrong!'},
              feature,
              requestData,
            }),
          );
      });
  }
};
