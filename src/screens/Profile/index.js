import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Block, Button, Icon, Text} from 'galio-framework';
import {connect} from 'react-redux';

import {logout as logoutUser} from '../../actions/logout';

import {unsetAuth} from '../../utils/auth';

import customTheme from '../../constants/theme';

const Profile = (props) => {
  const handleLogout = async () => {
    await unsetAuth();
    props.logoutUser();
  };
  console.log(props);
  return (
    <Block>
      <Header />
      <Block height={40}></Block>
      <Button onPress={handleLogout}>Logout</Button>
    </Block>
  );
};

const mapStateToProps = ({auth}) => ({user: auth.isAuth ? auth.user : {}});

const mapActionsToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);

const Header = () => (
  <View style={headerStyles.container}>
    <Icon
      family="MaterialIcons"
      name="admin-panel-settings"
      size={30}
      color={customTheme.COLORS.PRIMARY}
    />
    <Text style={headerStyles.text}>Profile Settings</Text>
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
