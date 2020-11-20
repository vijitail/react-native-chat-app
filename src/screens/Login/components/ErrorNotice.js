import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, theme} from 'galio-framework';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const ErrorNotice = ({message, onDismiss}) => (
  <TouchableOpacity
    onPress={onDismiss}
    activeOpacity={0.8}
    style={{width: '100%'}}>
    <View style={styles.errorContainer}>
      <Text size={18}>{message}</Text>
    </View>
  </TouchableOpacity>
);

export default ErrorNotice;

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: theme.COLORS.DANGER,
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    marginBottom: 10,
  },
});
