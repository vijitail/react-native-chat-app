import {
  MESSAGE,
  CREATE_MESSAGE,
  addMessage,
  markMessageAsFailed,
} from '../../actions/message';
import {API_ERROR, API_SUCCESS, apiRequest} from '../../actions/api';
import {setLoader} from '../../actions/ui';
import {setError} from '../../actions/error';

import {API_URL} from '../../constants/server';

const MESSAGE_URL = `${API_URL}/chats/message`;

export const messageMiddleware = () => (next) => (action) => {
  next(action);
  switch (action.type) {
    case CREATE_MESSAGE:
      if (action.payload.chatId === null) break;
      next(
        apiRequest({
          url: MESSAGE_URL,
          method: 'POST',
          body: {
            _id: action.payload._id,
            message: action.payload.message,
            chatId: action.payload.chat_id,
          },
          jwt: action.jwt,
          feature: CREATE_MESSAGE,
        }),
      );
      next(setLoader({state: true, feature: CREATE_MESSAGE}));
      break;
    case `${CREATE_MESSAGE} ${API_SUCCESS}`: {
      const messageRequestId = action.requestData._id;
      next(addMessage(action.payload, messageRequestId));
      break;
    }
    case `${CREATE_MESSAGE} ${API_ERROR}`: {
      const messageRequestId = action.requestData._id;
      const chatId = action.requestData.chatId;
      next(markMessageAsFailed(messageRequestId, chatId));
      break;
    }
  }
};
