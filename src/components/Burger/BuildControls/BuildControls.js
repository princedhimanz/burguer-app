import React from 'react';
import PropTypes from 'prop-types';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = ({
  ingredientAdded,
  ingredientRemoved,
  disabled,
  totalPrice,
  purchasable,
}) => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current price: <strong>{totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => ingredientAdded(ctrl.type)}
          removed={() => ingredientRemoved(ctrl.type)}
          disabled={disabled[ctrl.type]}
        />
      ))}
      <button className={styles.OrderButton} disabled={!purchasable}>
        ORDER NOW
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabled: PropTypes.object.isRequired,
  totalPrice: PropTypes.number.isRequired,
  purchasable: PropTypes.bool.isRequired,
};

export default BuildControls;
