import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import axiosOrders from '../../../axios-orders';
import { withRouter } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';

import styles from './ContactData.module.css';

const ContactData = ({ ingredients, totalPrice, history }) => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const orderHandler = async e => {
    e.preventDefault();
    setIsLoading(true);
    const order = {
      ingredients,
      totalPrice,
      customer: {
        name: 'Fidalgo',
        address: {
          street: 'Babushka street',
          zip: '23131',
          country: 'Portugal',
        },
        email: 'hello@fidalgo.dev',
      },
      deliveryMethod: 'fast',
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

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.ContactData}>
      <h4>Entry Contact Data</h4>
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={styles.Input}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={styles.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={orderHandler}>
          {' '}
          Order
        </Button>
      </form>
    </div>
  );
};

export default withRouter(ContactData);
