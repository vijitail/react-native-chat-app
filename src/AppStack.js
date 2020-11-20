import React, {useState} from 'react';
import {Animated} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import theme from './constants/theme';

//actions
import {setAuthUser} from './actions/login';

// screens
import Start from './screens/Start';
import Login from './screens/Login';
import Chat from './screens/Chat';

const Stack = createStackNavigator();

import {getToken, getUser} from './utils/auth';
import HomeTabs from './HomeTabs';

const AppStack = (props) => {
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);

  (async () => {
    const token = await getToken();
    const user = await getUser();
    if (token) {
      props.setAuthUser({token, user});
    }
    setTimeout(() => setCheckingAuthStatus(false), 1200);
  })();

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{headerShown: false, cardStyleInterpolator: forSlide}}>
      {checkingAuthStatus ? (
        <Stack.Screen name="Start" component={Start} />
      ) : props.isAuth ? (
        <>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="Chat" component={Chat} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = ({auth}) => ({
  isAuth: auth.isAuth,
});

const mapActionsToProps = {
  setAuthUser,
};

export default connect(mapStateToProps, mapActionsToProps)(AppStack);

const forSlide = ({current, next, inverted, layouts: {screen}}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
  };
};
