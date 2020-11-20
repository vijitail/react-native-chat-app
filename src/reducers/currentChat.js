import {
  INIT_CHAT,
  SET_CURRENT_CHAT,
  UNSET_CURRENT_CHAT,
  ADD_NEW_CHAT,
} from '../actions/chat';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT: {
      const {_id, user} = action.payload;
      return {_id, user};
    }
    case INIT_CHAT: {
      const {user, tempId} = action.payload;
      const chat = {
        _id: tempId,
        user,
      };
      return chat;
    }
    case ADD_NEW_CHAT: {
      const chat = action.payload.chat;
      return {
        _id: chat._id,
        user: chat.user,
      };
    }
    case UNSET_CURRENT_CHAT:
      return {};
    default:
      return state;
  }
};
