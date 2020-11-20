import React, {useRef} from 'react';

const Form = ({children, ...props}) => {
  const inputs = [];

  const focusNext = (i) => {
    while (!inputs[i]) i++;
    inputs[i].focus();
  };

  return React.Children.map(children, (Component, i) => {
    if (!Component || !Component.props.onChangeText) return Component;

    inputs[i] = null;

    const propsToInject = {
      onRef: (ref) => (inputs[i] = ref),
      blurOnSubmit: false,
    };

    if (!Component.props.submitFormOnSubmitEditing) {
      propsToInject.returnKeyType = 'next';
      propsToInject.onSubmitEditing = () => focusNext(i + 1);
    } else propsToInject.onSubmitEditing = props.onSubmit;

    return React.cloneElement(Component, {
      ...Component.props,
      ...propsToInject,
    });
  });
};

export default Form;
