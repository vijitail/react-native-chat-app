import React from 'react';
import {Input, Block, Button, Text} from 'galio-framework';
import {Formik} from 'formik';
import * as yup from 'yup';

import Form from '../../../components/Form';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = ({onSubmit, isSubmitting, ...props}) => {
  const handleFormSubmit = (values, {resetForm}) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            type="email-address"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && touched.email && (
            <Block>
              <Text style={{marginBottom: 12}}>{errors.email}</Text>
            </Block>
          )}
          <Input
            placeholder="Password"
            password
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            submitFormOnSubmitEditing
          />
          {errors.password && touched.password && (
            <Block>
              <Text style={{marginBottom: 12}}>{errors.password}</Text>
            </Block>
          )}
          <Block height={16} />
          <Button onPress={handleSubmit} disabled={isSubmitting}>
            {!isSubmitting ? 'Login' : 'Logging In...'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
