import React from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, Block, Icon} from 'galio-framework';

import theme from './constants/theme';

import Chats from './screens/Chats';
import Profile from './screens/Profile';
import AddUser from './screens/AddUser';

const TestScreen = () => (
  <Block flex middle>
    <Text h3>Test Screen</Text>
  </Block>
);

const Tab = createBottomTabNavigator();

const HomeTabs = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 60,
          elevation: 10,
          //   paddingVertical: 12,
        },
      }}>
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: () => (
            <Icon
              family="MaterialIcons"
              name="message"
              outline
              color={theme.COLORS.WHITE}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Test"
        component={AddUser}
        options={{
          tabBarIcon: () => (
            <Icon
              family="MaterialIcons"
              name="person-add-alt"
              outline
              color={theme.COLORS.WHITE}
              size={34}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image
              source={{uri: props.user && props.user.avatar}}
              style={{height: 40, width: 40, borderRadius: 200}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = ({auth}) => ({
  user: auth.user === undefined ? {} : auth.user,
});

export default connect(mapStateToProps)(HomeTabs);
