import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import 'react-native-gesture-handler';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import reducers from './src/reducers';

// middlewares
import coreMiddlewares from './src/middlewares/core';
import featureMiddlewares from './src/middlewares/app';

import theme from './src/constants/theme';

import withTheme from './src/components/withTheme';
import OfflineNotice from './src/components/OfflineNotice';

import AppStack from './src/AppStack';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.COLORS.PRIMARY,
    card: '#071621',
    text: theme.COLORS.WHITE,
    background: theme.COLORS.DARK,
  },
};

const createStoreWithMiddleware = applyMiddleware(
  ...featureMiddlewares,
  ...coreMiddlewares,
)(createStore);
const store = createStoreWithMiddleware(reducers);

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={theme.COLORS.DARK} />
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};

export default withTheme(App);
