import React, { useState, useEffect } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosOrders from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4,
};

const BurguerBuilder = props => {
  const [ingredients, setIngredients] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getIngredients = async () => {
      setisLoading(true);
      try {
        const res = await axiosOrders.get('/ingredients.json');
        setIngredients(res.data);
      } catch (err) {
        setError(true);
        console.log(err);
      }
      setisLoading(false);
    };
    getIngredients();
  }, []);

  // If ingredient count is 0, put ingredient disabled to true
  const disableInfo = { ...ingredients };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  function updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igName => {
        return ingredients[igName];
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    setPurchasable(sum > 0);
  }

  function addIngredientHandler(type) {
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = ingredients[type] + 1;
    setIngredients(updatedIngredients);

    const oldPrice = totalPrice;
    const newPrice = oldPrice + INGREDIENT_PRICES[type];
    setTotalPrice(newPrice);

    updatePurchaseState(updatedIngredients);
  }

  function removeIngredientHandler(type) {
    if (ingredients[type] === 0) return;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = ingredients[type] - 1;
    setIngredients(updatedIngredients);

    const oldPrice = totalPrice;
    const newPrice = oldPrice - INGREDIENT_PRICES[type];
    setTotalPrice(newPrice);

    updatePurchaseState(updatedIngredients);
  }

  function purchaseHandler() {
    setPurchasing(true);
  }

  function purchaseCancelHandler() {
    setPurchasing(false);
  }

  const purchaseContinueHandler = async () => {
    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(
        encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i])
      );
    }
    queryParams.push('price=' + totalPrice);
    const queryString = queryParams.join('&');

    props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {isLoading ? (
          <Spinner />
        ) : ingredients ? (
          <OrderSummary
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            ingredients={ingredients}
            price={totalPrice}
          />
        ) : null}
      </Modal>
      {ingredients ? (
        <React.Fragment>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={addIngredientHandler}
            ingredientRemoved={removeIngredientHandler}
            disabled={disableInfo}
            totalPrice={totalPrice}
            ordered={purchaseHandler}
            purchasable={purchasable}
          />
        </React.Fragment>
      ) : error ? (
        <p>There was an error loading ingredients</p>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

export default withErrorHandler(BurguerBuilder, axiosOrders);
