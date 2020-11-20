import {
  CHAT,
  FETCH_CHATS,
  INIT_CHAT,
  setChats,
  CREATE_CHAT,
  addNewChat,
} from '../../actions/chat';
import {API_ERROR, API_SUCCESS, apiRequest} from '../../actions/api';
import {setLoader} from '../../actions/ui';
import {setError} from '../../actions/error';

import {API_URL} from '../../constants/server';

const CHAT_URL = `${API_URL}/chats`;

export const chatsMiddleware = () => (next) => (action) => {
  next(action);

  switch (action.type) {
    case FETCH_CHATS:
      next(
        apiRequest({
          url: CHAT_URL,
          method: 'GET',
          jwt: action.jwt,
          feature: FETCH_CHATS,
        }),
      );
      next(setLoader({state: true, feature: FETCH_CHATS}));
      break;
    case `${FETCH_CHATS} ${API_SUCCESS}`:
      next(setChats(action.payload));
      next(setLoader({state: false, feature: FETCH_CHATS}));
      break;
    case `${FETCH_CHATS} ${API_ERROR}`:
      next(setError({message: action.payload, feature: FETCH_CHATS}));
      next(setLoader({state: false, feature: FETCH_CHATS}));
      break;
    case CREATE_CHAT:
      next(
        apiRequest({
          url: CHAT_URL,
          method: 'POST',
          body: {
            user: action.payload.user,
            message: action.payload.message.message,
          },
          jwt: action.jwt,
          feature: CREATE_CHAT,
        }),
      );
      next(setLoader({state: true, feature: CREATE_CHAT}));
      break;
    case `${CREATE_CHAT} ${API_SUCCESS}`:
      next(addNewChat(action.payload, action.requestData.chatId));
      next(setLoader({state: false, feature: CREATE_CHAT}));
      break;
    case `${CREATE_CHAT} ${API_ERROR}`:
      next(setError({message: action.payload, feature: CREATE_CHAT}));
      next(setLoader({state: false, feature: CREATE_CHAT}));
      break;
  }
};
