import {loginMiddleware} from './login';
import {chatsMiddleware} from './chats';
import {searchMiddleware} from './search';
import {messageMiddleware} from './message';
import {socketMiddleware} from './socket';

export default [
  loginMiddleware,
  chatsMiddleware,
  messageMiddleware,
  searchMiddleware,
  socketMiddleware,
];
