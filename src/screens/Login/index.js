import React, {memo} from 'react';
import {View} from 'react-native';
import {Block, Text} from 'galio-framework';
import {connect} from 'react-redux';

import LoginForm from './components/LoginForm';

import {login as loginUser} from '../../actions/login';
import {removeError} from '../../actions/error';
import ErrorNotice from './components/ErrorNotice';

const Login = (props) => {
  const handleLoginFormSubmit = (values) => {
    props.removeError();
    props.loginUser(values);
  };
  const {error} = props;
  return (
    <Block flex left middle safe>
      <Text h1>Login</Text>
      <Block height={25} />
      {error.message && (
        <ErrorNotice message={error.message} onDismiss={props.removeError} />
      )}
      <LoginForm
        isSubmitting={props.isSubmitting}
        onSubmit={handleLoginFormSubmit}
      />
    </Block>
  );
};

const mapStateToProps = ({ui, error}) => ({
  isSubmitting: ui.loading,
  error,
});

export default connect(mapStateToProps, {loginUser, removeError})(memo(Login));
