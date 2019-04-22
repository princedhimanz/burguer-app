import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axiosOrders from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as orderActions from '../../../store/actions';
import { updateObject, checkValidity } from '../../../shared/utility';

import styles from './ContactData.module.css';

const ContactData = ({
  ings,
  totalPrice,
  onOrderBurger,
  token,
  loading,
  userId,
}) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Name',
      },
      value: '',
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code',
      },
      value: '',
      validation: {
        required: true,
        isNumeric: true,
        minLength: 4,
        maxLength: 8,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: 'fastest',
            displayValue: 'Fastest',
          },
          {
            value: 'cheapest',
            displayValue: 'Cheapest',
          },
        ],
      },
      value: 'fastest',
      validation: {},
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  // When input change, make a copy of the formdata, then make a deep copy of form element, then change value of that form element, and then update the form copy data on that form element position. Only then update state
  function handleInputChange(event, inputId) {
    const updatedFormElement = updateObject(orderForm[inputId], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(event.target.value, orderForm[inputId].validation),
    });

    const updatedData = updateObject(orderForm, {
      [inputId]: updatedFormElement,
    });

    // Check if all forms are valid to set formIsValidState
    let formIsValidCheck = true;
    for (let inputEl in updatedData) {
      formIsValidCheck = updatedData[inputEl].valid && formIsValidCheck;
    }
    setFormIsValid(formIsValidCheck);
    setOrderForm(updatedData);
  }

  const orderHandler = async e => {
    e.preventDefault();
    const formData = {};
    for (let formElement in orderForm) {
      formData[formElement] = orderForm[formElement].value;
    }
    const order = {
      ings,
      totalPrice,
      orderData: formData,
      userId,
    };
    onOrderBurger(order, token);
  };

  const formElementsArray = [];
  for (let inputName in orderForm) {
    formElementsArray.push({
      id: inputName,
      config: orderForm[inputName],
    });
  }

  const form = (
    <form onSubmit={orderHandler}>
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
      <Button disabled={!formIsValid} btnType="Success">
        Order
      </Button>
    </form>
  );

  return loading ? (
    <Spinner />
  ) : (
    <div className={styles.ContactData}>
      <h4>Enter Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = ({ burgerBuilder, order, auth }) => ({
  ings: burgerBuilder.ingredients,
  totalPrice: burgerBuilder.totalPrice,
  loading: order.loading,
  token: auth.token,
  userId: auth.userId,
});

const mapDispatchToProps = {
  onOrderBurger: orderActions.purchaseBurger,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(withRouter(ContactData), axiosOrders));
