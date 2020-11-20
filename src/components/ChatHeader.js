import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, View, Easing} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import {Icon, Text} from 'galio-framework';
import {TouchableOpacity} from 'react-native-gesture-handler';
import customTheme from '../constants/theme';

const ChatHeader = ({user}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const [isExpanded, setExpanded] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;

  const initialHeaderHeight = 65;
  const initialImageDim = 45;
  const initialOnlineStatusDim = 13;

  const headerHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [initialHeaderHeight, 140],
  });

  const avatarDim = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [initialImageDim, 70],
  });

  const onlineDim = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [initialOnlineStatusDim, 17],
  });

  const nameFade = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const toggleHeaderExpand = () => {
    if (!isExpanded)
      Animated.timing(animatedController, {
        duration: 240,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.4, 1.4),
        useNativeDriver: false,
      }).start();
    else
      Animated.timing(animatedController, {
        duration: 240,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.4, 1.4),
        useNativeDriver: false,
      }).start();

    setExpanded(!isExpanded);
  };

  return (
    <Animated.View
      style={[
        {backgroundColor: colors.card, height: headerHeight},
        styles.headerContainer,
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleBackButtonPress}
        style={styles.backButton}>
        <Icon
          family="MaterialIcons"
          name="arrow-back"
          size={26}
          color={colors.text}
        />
      </TouchableOpacity>
      <View style={styles.headerMiddle}>
        <TouchableOpacity activeOpacity={1} onPress={toggleHeaderExpand}>
          <Animated.View
            style={[
              styles.avatarContainer,
              {height: avatarDim, width: avatarDim},
            ]}>
            <Animated.Image
              source={{uri: user.avatar}}
              style={[styles.avatar]}
            />
            {user.isOnline && (
              <Animated.View
                style={[styles.online, {height: onlineDim, width: onlineDim}]}
              />
            )}
          </Animated.View>
        </TouchableOpacity>
        <Animated.Text style={[styles.username, {opacity: nameFade}]}>
          {user.name}
        </Animated.Text>
      </View>
      <View style={{width: 26}}></View>
    </Animated.View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  headerMiddle: {
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    marginTop: 6,
  },
  avatarContainer: {
    position: 'relative',
  },
  online: {
    position: 'absolute',
    backgroundColor: '#3AEA4C',
    borderWidth: 2,
    borderColor: customTheme.COLORS.DARK,
    bottom: 0,
    right: 0,
    borderRadius: 100,
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#eee',
  },
  username: {
    color: customTheme.COLORS.WHITE,
    fontSize: 22,
    fontFamily: customTheme.FONTS.MEDIUM,
    marginTop: 14,
  },
});
