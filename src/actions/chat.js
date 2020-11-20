// feature name
export const CHAT = `[chat]`;

// action types
export const FETCH_CHATS = `${CHAT} FETCH_CHATS`;
export const SET_CHATS = `${CHAT} SET_CHATS`;
export const SET_CURRENT_CHAT = `${CHAT} SET_CURRENT_CHAT`;
export const UNSET_CURRENT_CHAT = `${CHAT} UNSET_CURRENT_CHAT`;
export const INIT_CHAT = `${CHAT} INIT_CHAT`;
export const CREATE_CHAT = `${CHAT} CREATE_CHAT`;
export const ADD_NEW_CHAT = `${CHAT} ADD_NEW_CHAT`;
export const ADD_INCOMING_CHAT = `${CHAT} ADD_INCOMING_CHAT`;

// action creators
export const fetchChats = (jwt) => ({
  type: FETCH_CHATS,
  jwt,
});

export const setChats = (chats) => ({
  type: SET_CHATS,
  payload: chats,
});

export const setCurrentChat = (user, chatId) => {
  return {type: SET_CURRENT_CHAT, payload: {_id: chatId, user}};
};

export const unsetCurrentChat = () => ({
  type: UNSET_CURRENT_CHAT,
});

export const initializeChat = (user, currentUserId) => ({
  type: INIT_CHAT,
  payload: {
    tempId: Date.now().toString(),
    participants: [user._id, currentUserId],
    user,
  },
});

export const createChat = (tempChatId, userId, message, jwt) => ({
  type: CREATE_CHAT,
  payload: {
    chatId: tempChatId,
    user: userId,
    message,
  },
  jwt,
});

export const addNewChat = (chat, requestChatId) => ({
  type: ADD_NEW_CHAT,
  payload: {chat, requestChatId},
});

export const addIncomingChat = (newChat) => ({
  type: ADD_INCOMING_CHAT,
  payload: newChat,
});
