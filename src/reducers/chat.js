import {
  SET_CHATS,
  INIT_CHAT,
  ADD_NEW_CHAT,
  CREATE_CHAT,
  ADD_INCOMING_CHAT,
} from '../actions/chat';
import {
  ADD_INCOMING_MESSAGE,
  ADD_MESSAGE,
  CREATE_MESSAGE,
  MESSAGE_FAILED,
} from '../actions/message';

export default (state = [], action) => {
  switch (action.type) {
    case SET_CHATS:
      return action.payload;
    case INIT_CHAT: {
      const chats = [...state];
      const {participants, user, tempId} = action.payload;
      const newChat = {
        _id: tempId,
        participants,
        user,
        recent_messages: [],
        isCreated: false,
      };
      const updatedChats = [newChat, ...chats];
      return updatedChats;
    }
    case CREATE_CHAT: {
      const chats = [...state];
      const {chatId, message} = action.payload;
      const updatedChats = chats.map((chat) => {
        if (chat._id === chatId) {
          const messages = [...chat.recent_messages, message];
          return {...chat, recent_messages: messages};
        }
        return chat;
      });
      return updatedChats;
    }
    case ADD_NEW_CHAT: {
      const chats = [...state];
      const newChat = action.payload.chat;
      console.log('new CHat', newChat);
      const updatedChats = chats.map((chat) => {
        if (isArrayEqual(chat.participants, newChat.participants)) {
          return {...newChat, isCreated: true};
        }
        return chat;
      });
      return updatedChats;
    }
    case ADD_INCOMING_CHAT: {
      const newChat = action.payload;
      return [newChat, ...state];
    }
    case CREATE_MESSAGE: {
      const chats = [...state];
      const newMessage = action.payload;
      let currentChat = {};
      const updatedChats = chats.filter((chat) => {
        if (chat._id === newMessage.chat_id) {
          const {recent_messages} = chat;
          const updatedMessages = [newMessage, ...recent_messages];
          currentChat = {...chat, recent_messages: updatedMessages};
          return false;
        }
        return true;
      });
      return [currentChat, ...updatedChats];
    }
    case ADD_MESSAGE: {
      const chats = [...state];
      const chatId = action.payload.message.chat_id;
      const updatedChats = chats.map((chat) => {
        if (chat._id === chatId) {
          const updatedMessages = chat.recent_messages.map((message) => {
            if (message._id === action.payload.messageRequestId) {
              return action.payload.message;
            } else return message;
          });
          return {...chat, recent_messages: updatedMessages};
        }
        return chat;
      });
      return updatedChats;
    }
    case ADD_INCOMING_MESSAGE: {
      const chats = [...state];
      const chatId = action.payload.chat_id;
      const updatedChats = chats.map((chat) => {
        if (chat._id === chatId) {
          const newMessage = action.payload;
          const updatedMessages = [newMessage, ...chat.recent_messages];
          return {...chat, recent_messages: updatedMessages};
        }
        return chat;
      });
      return updatedChats;
    }
    case MESSAGE_FAILED: {
      const chats = [...state];
      const {messageRequestId, chatId} = action.payload;
      const updatedChats = chats.map((chat) => {
        if (chat._id === chatId) {
          const updatedMessages = chat.recent_messages.map((message) => {
            if (message._id === messageRequestId) {
              return {...message, hasFailed: true};
            } else return message;
          });
          return {...chat, recent_messages: updatedMessages};
        }
        return chat;
      });
      return updatedChats;
    }
    default:
      return state;
  }
};

const isArrayEqual = (a, b) => {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  for (const v of uniqueValues) {
    const aCount = a.filter((e) => e === v).length;
    const bCount = b.filter((e) => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
};
