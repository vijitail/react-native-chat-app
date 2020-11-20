import io from 'socket.io-client';

import {API_URL} from '../../constants/server';

import {SET_AUTH_USER} from '../../actions/login';
import {addIncomingChat} from '../../actions/chat';
import {addIncomingMessage} from '../../actions/message';

export const socketMiddleware = ({getState, dispatch}) => {
  const socket = io(API_URL);

  socket.on('incomingChat', (newChat) => dispatch(addIncomingChat(newChat)));
  socket.on('incomingMessage', (newMessage) => {
    console.log(newMessage);
    dispatch(addIncomingMessage(newMessage));
  });

  return (next) => (action) => {
    next(action);

    if (action.type.includes(SET_AUTH_USER)) {
      const authState = getState().auth;

      if (authState.isAuth) {
        socket.emit(`userConnected`, authState.user.id);
      }
    }
  };
};
