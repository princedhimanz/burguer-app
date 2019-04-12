import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = props => {
  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    setIngredients(ingredients);
  }, []);

  function onCheckoutCancelled() {
    props.history.goBack();
  }

  function onCheckoutContinued() {
    props.history.replace('/checkout/contact-data');
  }

  const [ingredients, setIngredients] = useState({
    salad: 1,
    meat: 1,
    cheese: 1,
    bacon: 1,
  });
  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={onCheckoutCancelled}
        checkoutContinued={onCheckoutContinued}
      />
    </div>
  );
};

Checkout.propTypes = {};

export default Checkout;
