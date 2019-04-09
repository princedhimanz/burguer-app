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
  const [purchasable, setPurchasable] = useState(false);

  // If ingredient count is 0, put ingredient disabled to true
  const disableInfo = { ...ingredients };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igName => {
        return ingredients[igName];
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    setPurchasable(sum > 0);
  };

  const addIngredientHandler = type => {
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = ingredients[type] + 1;
    setIngredients(updatedIngredients);

    const oldPrice = totalPrice;
    const newPrice = oldPrice + INGREDIENT_PRICES[type];
    setTotalPrice(newPrice);

    updatePurchaseState(updatedIngredients);
  };

  const removeIngredientHandler = type => {
    if (ingredients[type] === 0) return;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = ingredients[type] - 1;
    setIngredients(updatedIngredients);

    const oldPrice = totalPrice;
    const newPrice = oldPrice - INGREDIENT_PRICES[type];
    setTotalPrice(newPrice);

    updatePurchaseState(updatedIngredients);
  };

  return (
    <React.Fragment>
      <Burger ingredients={ingredients} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabled={disableInfo}
        totalPrice={totalPrice}
        purchasable={purchasable}
      />
    </React.Fragment>
  );
};

export default BurguerBuilder;
