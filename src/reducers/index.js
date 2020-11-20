import {combineReducers} from 'redux';

import auth from './auth';
import chats from './chat';
import search from './search';
import currentChat from './currentChat';
import ui from './ui';
import error from './error';

const appReducer = combineReducers({
  auth,
  chats,
  currentChat,
  searchResults: search,
  ui,
  error,
});

export default appReducer;
