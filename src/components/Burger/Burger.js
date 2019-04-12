import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients, ...rest }) => {
  // Take the object, and transform into an array with the name of the ingredients
  let transformedIngredients = Object.keys(ingredients)
    .map(igName => {
      // Then map over that array of ingredients, and on each one return an array with the size of the amount of ingredients from the object received. We then have an array, with arrays inside, each array with the length of each ingredient received.
      return [...Array(ingredients[igName])].map((_, i) => {
        // We then map over that array, and return the BurgerIngredient component for each one
        return <BurgerIngredient key={igName + i} type={igName} />;
      });
    })
    // Flatten the array of arrays into a single array to check if no ingredients passed
    .reduce((prev, curr) => {
      return prev.concat(curr);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients....</p>;
  }
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

export default withRouter(Burger);
