import React from 'react';
import PropTypes from 'prop-types';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {
  // Take the object, and transform into an array with the name of the ingredients
  const transformedIngredients = Object.keys(ingredients).map(igName => {
    // Then map over that array of ingredients, and on each one return an array with the size of the amount of ingredients from the object received. We then have an array, with arrays inside, each array with the length of each ingredient received.
    return [...Array(ingredients[igName])].map((_, i) => {
      // We then map over that array, and return the BurgerIngredient component for each one
      return <BurgerIngredient key={igName + i} type={igName} />;
    });
  });
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

export default Burger;
