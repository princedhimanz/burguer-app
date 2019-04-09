import React, { useState } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4,
};

const BurguerBuilder = props => {
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const addIngredientHandler = type => {
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = ingredients[type] + 1;
    setIngredients(updatedIngredients);

    const oldPrice = totalPrice;
    const newPrice = oldPrice + INGREDIENT_PRICES[type];
    setTotalPrice(newPrice);
  };

  const removeIngredientHandler = type => {
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = ingredients[type] - 1;
    setIngredients(updatedIngredients);

    const oldPrice = totalPrice;
    const newPrice = oldPrice - INGREDIENT_PRICES[type];
    setTotalPrice(newPrice);
  };

  return (
    <React.Fragment>
      <Burger ingredients={ingredients} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
      />
    </React.Fragment>
  );
};

export default BurguerBuilder;
