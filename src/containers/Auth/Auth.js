import React, { useState, useEffect } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import styles from './Auth.module.css';

const Auth = () => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 7,
      },
      valid: false,
      touched: false,
    },
  });

  // Check validity of input. In this case only if its filled when required
  // Start with true, and on every rule we check if the condition is true, and if isValid is already true
  // By doing this, all validations have to pass instead of only the last one
  function checkValidity(value, rules) {
    let isValid = true;

    if (!rules) return true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  const formElementsArray = [];
  for (let inputName in orderForm) {
    formElementsArray.push({
      id: inputName,
      config: orderForm[inputName],
    });
  }

  // When input change, make a copy of the formdata, then make a deep copy of form element, then change value of that form element, and then update the form copy data on that form element position. Only then update state
  function handleInputChange(event, inputId) {
    const updatedData = {
      ...orderForm,
      [inputId]: {
        ...orderForm[inputId],
        value: event.target.value,
        valid: checkValidity(event.target.value, orderForm[inputId].validation),
        touched: true,
      },
    };
    setOrderForm(updatedData);
  }

  const form = (
    <form>
      {formElementsArray.map(formEl => (
        <Input
          key={formEl.id}
          elementType={formEl.config.elementType}
          elementConfig={formEl.config.elementConfig}
          value={formEl.config.value}
          invalid={!formEl.config.valid}
          touched={formEl.config.touched}
          shouldValidate={formEl.config.validation}
          changed={e => handleInputChange(e, formEl.id)}
        />
      ))}
      <Button btnType="Success">SUBMIT</Button>
    </form>
  );

  return <div className={styles.Auth}>{form}</div>;
};

export default Auth;
