import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axiosOrders from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactData.module.css';

const ContactData = ({ ingredients, totalPrice, history }) => {
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
        minLength: 4,
        maxLength: 7,
      },
      valid: false,
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
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      value: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  // When input change, make a copy of the formdata, then make a deep copy of form element, then change value of that form element, and then update the form copy data on that form element position. Only then update state
  function handleInputChange(event, inputId) {
    const updatedData = { ...orderForm };
    const updatedFormElement = {
      ...updatedData[inputId],
      value: event.target.value,
    };
    // Check if input is valid, in this case check only if its filled when required
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedData[inputId] = updatedFormElement;
    console.log(updatedFormElement);
    setOrderForm(updatedData);
  }

  // Check validity of input. In this case only if its filled when required
  // Start with true, and on every rule we check if the condition is true, and if isValid is already true
  // By doing this, all validations have to pass instead of only the last one
  function checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  const orderHandler = async e => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {};
    for (let formElement in orderForm) {
      formData[formElement] = orderForm[formElement].value;
    }
    const order = {
      ingredients,
      totalPrice,
      orderData: formData,
    };
    try {
      const res = await axiosOrders.post('/orders.json', order);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    history.push('/');
  };

  const formElementsArray = [];
  for (let inputName in orderForm) {
    formElementsArray.push({ id: inputName, config: orderForm[inputName] });
  }

  const form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formEl => (
        <Input
          key={formEl.id}
          elementType={formEl.config.elementType}
          elementConfig={formEl.config.elementConfig}
          value={formEl.config.value}
          changed={e => handleInputChange(e, formEl.id)}
        />
      ))}
      <Button btnType="Success">Order</Button>
    </form>
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.ContactData}>
      <h4>Entry Contact Data</h4>
      {form}
    </div>
  );
};

export default withRouter(ContactData);