// feature name
export const MESSAGE = `[message]`;

// action types
export const CREATE_MESSAGE = `${MESSAGE} CREATE_MESSSAGE`;
export const ADD_MESSAGE = `${MESSAGE} ADD_MESSAGE`;
export const MESSAGE_FAILED = `${MESSAGE} MESSAGE_FAILED`;
export const ADD_INCOMING_MESSAGE = `${MESSAGE} ADD_INCOMING_MESSAGE`;

// action creators
export const createMessage = (chatId, message, userId, jwt) => ({
  type: CREATE_MESSAGE,
  payload: {
    _id: Date.now().toString(),
    message: message,
    chat_id: chatId,
    sent_by: {
      _id: userId,
    },
    isSending: true,
  },
  jwt,
});

export const addMessage = (message, messageRequestId) => ({
  type: ADD_MESSAGE,
  payload: {message, messageRequestId},
});

export const addIncomingMessage = (newMessage) => ({
  type: ADD_INCOMING_MESSAGE,
  payload: newMessage,
});

export const markMessageAsFailed = (messageRequestId, chatId) => ({
  type: MESSAGE_FAILED,
  payload: {messageRequestId, chatId},
});
