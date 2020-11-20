import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {View, FlatList} from 'react-native';
import {Block} from 'galio-framework';
import {connect} from 'react-redux';

import ChatHeader from '../../components/ChatHeader';
import MessageInput from './components/MessageInput';
import Message from './components/Message';

import {createChat} from '../../actions/chat';
import {createMessage} from '../../actions/message';

const Chat = (props) => {
  const messagesFlatList = useRef(null);
  const {navigation} = props;

  const messages = props.currentChat.messages;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        height: 65,
      },
      header: ({previous}) => {
        return (
          <ChatHeader user={props.currentChat.user} showBackButton={previous} />
        );
      },
    });
  }, [navigation]);

  const sendMessage = (message) => {
    const {
      currentChat,
      authToken,
      createChat,
      createMessage,
      authUserId,
    } = props;
    if (!currentChat.isCreated && messages.length == 0) {
      console.log('CREATE_CHAT');
      const msgObj = {
        _id: Date.now().toString(),
        message,
        sent_by: {
          _id: authUserId,
        },
        isSending: true,
      };
      createChat(currentChat._id, currentChat.user, msgObj, authToken);
    } else {
      console.log('CREATE MESSAGE');
      createMessage(currentChat._id, message, authUserId, authToken);
    }
  };

  return (
    <Block flex safe>
      <FlatList
        ref={messagesFlatList}
        inverted={-1}
        // onContentSizeChange={() =>
        //   messagesFlatList.current.scrollToEnd({animated: true})
        // }
        // onLayout={() => messagesFlatList.current.scrollToEnd({animated: false})}
        showsVerticalScrollIndicator={false}
        data={messages}
        renderItem={({item}) => {
          return (
            <Message
              isSending={item.isSending}
              sent={props.authUserId === item.sent_by._id}>
              {item.message}
            </Message>
          );
        }}
        style={{flex: 1}}
        keyExtractor={(message) => message._id}
      />
      <MessageInput onSend={sendMessage} />
    </Block>
  );
};

const mapStateToProps = ({currentChat, chats, auth}) => {
  const {recent_messages, ...activeChatRest} = chats.filter(
    (chat) => chat._id === currentChat._id,
  )[0];
  return {
    authToken: auth.token,
    authUserId: auth.user ? auth.user.id : null,
    currentChat: {
      user: currentChat.user,
      messages: recent_messages,
      ...activeChatRest,
    },
  };
};

export default connect(mapStateToProps, {
  createChat,
  createMessage,
})(Chat);
