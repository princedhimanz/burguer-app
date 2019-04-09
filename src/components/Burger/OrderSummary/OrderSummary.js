import React from 'react';
import PropTypes from 'prop-types';

const OrderSummary = ({ ingredients }) => {
  const ingredientSummary = Object.keys(ingredients).map(igName => {
    return (
      <li key={igName}>
        <span style={{ textTransform: 'capitalize' }}>{igName}</span>:{' '}
        {ingredients[igName]}
      </li>
    );
  });
  return (
    <React.Fragment>
      <h3>Your oder</h3>
      <p>A delicious burget with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
    </React.Fragment>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

export default OrderSummary;
