import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {Icon} from 'galio-framework';

import customTheme from '../../../constants/theme';

const MessageInput = ({onSend}) => {
  const [message, setMessage] = useState('');

  const handleMessageSend = () => {
    onSend(message);
    setMessage('');
    Keyboard.dismiss();
  };

  const handleMessageChange = (value) => setMessage(value);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type Your Message ..."
        placeholderTextColor="#c9c9c9"
        value={message}
        onChangeText={handleMessageChange}
        onSubmitEditing={handleMessageSend}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={handleMessageSend}>
        <Icon
          name="arrow-upward"
          family="MaterialIcons"
          size={26}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 6,
    borderColor: '#c9c9c9',
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    marginLeft: 18,
  },
  button: {
    backgroundColor: customTheme.COLORS.PRIMARY,
    borderRadius: 100,
    width: 55,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
