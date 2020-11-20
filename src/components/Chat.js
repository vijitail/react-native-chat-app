import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text} from 'galio-framework';

import customTheme from '../constants/theme';

const Chat = ({user, message, onPress, ...props}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={styles.container}
    onPress={onPress}>
    <View style={styles.avatarContainer}>
      <Image source={{uri: user.avatar}} style={styles.avatar} />
      {user.isOnline && <View style={styles.online} />}
    </View>
    <View style={styles.textContainer}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.userName}>
        {user.name}
      </Text>
      {message && (
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.message}>
          {message}
        </Text>
      )}
    </View>
    <View style={styles.badgeContainer}></View>
  </TouchableOpacity>
);

export default Chat;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 104,
    borderBottomWidth: 1,
    borderBottomColor: '#071621',
    // justifyContent: 'space-evenly',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  online: {
    position: 'absolute',
    height: 17,
    width: 17,
    backgroundColor: '#3AEA4C',
    borderWidth: 2,
    borderColor: customTheme.COLORS.DARK,
    bottom: -2,
    right: -4,
    borderRadius: 100,
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 24,
    backgroundColor: '#eee',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontFamily: customTheme.FONTS.MEDIUM,
    fontSize: 20,
  },
  message: {
    color: '#C9C9C9',
    fontSize: 16,
    width: '100%',
    marginTop: 5,
  },
  badgeContainer: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
});
