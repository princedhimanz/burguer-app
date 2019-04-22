import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';

import styles from './Auth.module.css';

const Auth = props => {
  const [formData, setFormData] = useState({
    email: {
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

  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (!props.buildingBurger && props.afterAuthRedirect !== '/')
      props.setAfterAuthRedirect('/');
  }, []);

  const formElementsArray = [];
  for (let inputName in formData) {
    formElementsArray.push({
      id: inputName,
      config: formData[inputName],
    });
  }

  // When input change, make a copy of the formdata, then make a deep copy of form element, then change value of that form element, and then update the form copy data on that form element position. Only then update state
  function handleInputChange(event, inputId) {
    const updatedData = updateObject(formData, {
      [inputId]: updateObject(formData[inputId], {
        value: event.target.value,
        valid: checkValidity(event.target.value, formData[inputId].validation),
        touched: true,
      }),
    });

    setFormData(updatedData);
  }

  // Submit handler
  const submitHandler = e => {
    e.preventDefault();
    props.auth(formData.email.value, formData.password.value, isSignUp);
  };

  // Switch between login and register mode
  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const form = (
    <form onSubmit={submitHandler}>
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
      <Button btnType="Success">{isSignUp ? 'REGISTER' : 'LOGIN'}</Button>
    </form>
  );

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  return props.loading ? (
    <Spinner />
  ) : props.isAuth ? (
    <Redirect to={props.afterAuthRedirect} />
  ) : (
    <div className={styles.Auth}>
      {errorMessage}
      {form}
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isSignUp ? 'LOGIN MODE' : 'REGISTER MODE'}
      </Button>
    </div>
  );
};

const mapStateToProps = ({ auth, burgerBuilder }) => ({
  loading: auth.loading,
  error: auth.error,
  isAuth: auth.token !== null,
  buildingBurger: burgerBuilder.building,
  afterAuthRedirect: auth.afterAuthRedirect,
});

const mapDispatchToProps = {
  auth: actions.auth,
  setAfterAuthRedirect: actions.setAfterAuthRedirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
