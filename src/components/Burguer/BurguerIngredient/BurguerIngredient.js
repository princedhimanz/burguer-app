import React from 'react';
import PropTypes from 'prop-types';

import styles from './BurguerIngredient';

const BurguerIngredient = ({ type }) => {
  let ingredient = null;

  switch (type) {
    case 'bread-bottom':
      ingredient = <div className={styles.BreadBottom} />;
      break;
    case 'bread-top':
      ingredient = (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1} />
          <div className={styles.Seeds2} />
        </div>
      );
      break;
    case 'meat':
      ingredient = <div className={styles.Meat} />;
      break;
    case 'cheese':
      ingredient = <div className={styles.Cheese} />;
      break;
    case 'salad':
      ingredient = <div classname={styles.Salad} />;
      break;
    case 'bacon':
      ingredient = <div className={styles.Bacon} />;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

BurguerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurguerIngredient;
