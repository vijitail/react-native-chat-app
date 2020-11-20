import React, {useEffect} from 'react';

import {View, StyleSheet, FlatList} from 'react-native';
import {Block, Button, Icon, Input, Text} from 'galio-framework';
import {connect} from 'react-redux';

import customTheme from '../../constants/theme';

import {fetchChats, setCurrentChat, setChats} from '../../actions/chat';

import Chat from '../../components/Chat';

const Chats = (props) => {
  useEffect(() => {
    // const socket = io(API_URL);
    // socket.on(`incomingChat_${props.user.id}`, (incomingChat) =>
    //   props.setChats([incomingChat, ...props.chats]),
    // );
    props.fetchChats(props.token);
  }, []);

  const handleChatPress = (user, chatId) => {
    props.setCurrentChat(user, chatId);
    props.navigation.navigate('Chat');
  };

  return (
    <Block>
      <Header />
      <Input placeholder="Search" style={{borderWidth: 2}} />
      <FlatList
        data={props.chats}
        renderItem={({item}) => (
          <Chat
            user={item.user}
            message={
              item.recent_messages.length > 0 && item.recent_messages[0].message
            }
            onPress={() => handleChatPress(item.user, item._id)}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </Block>
  );
};

const mapStateToProps = ({auth, chats, searchResults}) => ({
  user: auth.user,
  token: auth.token,
  chats: chats,
});

const mapActionsToProps = {
  fetchChats,
  setCurrentChat,
  setChats,
};

export default connect(mapStateToProps, mapActionsToProps)(Chats);

const Header = () => (
  <View style={headerStyles.container}>
    <Icon
      family="MaterialCommunityIcons"
      name="forum"
      size={30}
      color={customTheme.COLORS.PRIMARY}
    />
    <Text style={headerStyles.text}>Inbox</Text>
  </View>
);

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  text: {
    fontFamily: customTheme.FONTS.BLACK,
    fontSize: 28,
    marginLeft: 12,
  },
});
