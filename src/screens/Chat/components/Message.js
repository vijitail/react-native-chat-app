import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'galio-framework';

const Message = ({children, sent, isSending}) => (
  <View style={styles.container}>
    <View style={[styles.message, sent && styles.sentMessage]}>
      <Text size={18}>{children}</Text>
    </View>
    {isSending && (
      <Text size={12} style={styles.sendingStatus}>
        Sending...
      </Text>
    )}
  </View>
);

export default Message;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  message: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#0D334E',
    borderRadius: 100,
    borderBottomLeftRadius: 0,
    alignSelf: 'flex-start',
  },
  sentMessage: {
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 0,
    alignSelf: 'flex-end',
    backgroundColor: '#0B578E',
  },
  sendingStatus: {
    alignSelf: 'flex-end',
    marginTop: 4,
    color: '#c9c9c9',
  },
});
