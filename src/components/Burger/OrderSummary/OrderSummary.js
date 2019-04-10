import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

const OrderSummary = ({ ingredients, purchaseCanceled, purchaseContinued }) => {
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
      <Button btnType="Danger" clicked={purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </React.Fragment>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  purchaseCanceled: PropTypes.func.isRequired,
  purchaseContinued: PropTypes.func.isRequired,
};

export default OrderSummary;
