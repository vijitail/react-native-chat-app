import React, {useEffect, useRef} from 'react';
import {Animated, Text, StyleSheet} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {theme} from 'galio-framework';

const OfflineNotice = () => {
  const {isConnected, isInternetReachable} = useNetInfo();

  const animatedController = useRef(new Animated.Value(0)).current;

  const height = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60],
  });

  useEffect(() => {
    const animationOptions = {
      duration: 200,
      toValue: 0,
      useNativeDriver: false,
    };
    let animation = {};
    if (!(isConnected && isInternetReachable)) {
      animation = Animated.timing(animatedController, animationOptions);
    } else {
      animation = Animated.timing(animatedController, {
        ...animationOptions,
        toValue: 0,
      });
    }
    animation.start();
  }, [isConnected, isInternetReachable]);

  return (
    <Animated.View style={[styles.container, {height}]}>
      <Text style={styles.text}>No Internet Connection</Text>
    </Animated.View>
  );
};

export default OfflineNotice;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.COLORS.DANGER,
  },
  text: {
    color: theme.COLORS.WHITE,
    fontSize: 18,
    textAlign: 'center',
  },
});
