import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosOrders from '../../axios-orders';

export const BurguerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  useEffect(() => {
    props.getIngredients();
  }, []);

  // If ingredient count is 0, put ingredient disabled to true
  const disableInfo = { ...props.ings };
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
    return sum > 0;
  }

  const purchaseContinueHandler = () => {
    props.purchaseBurgerInit();
    props.history.push('/checkout');
  };

  const setPurchaseHandler = () => {
    if (props.isAuth) {
      setPurchasing(true);
    }

    //Not authed, redirect to login
    props.setAfterAuthRedirect('/checkout');
    props.history.push('/auth');
  };

  return props.error ? (
    <p>There was an error</p>
  ) : !props.ings ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={() => setPurchasing(false)}>
        <OrderSummary
          purchaseCanceled={() => setPurchasing(false)}
          purchaseContinued={purchaseContinueHandler}
          ingredients={props.ings}
          price={props.totalPrice}
        />
      </Modal>
      <Burger ingredients={props.ings} />
      <BuildControls
        ingredientAdded={props.addIngredient}
        ingredientRemoved={props.removeIngredient}
        disabled={disableInfo}
        totalPrice={props.totalPrice}
        ordered={setPurchaseHandler}
        purchasable={updatePurchaseState(props.ings)}
        isAuth={props.isAuth}
      />
    </React.Fragment>
  );
};

const mapStateToProps = ({ burgerBuilder, auth }) => ({
  ings: burgerBuilder.ingredients,
  totalPrice: burgerBuilder.totalPrice,
  error: burgerBuilder.error,
  isAuth: auth.token !== null,
});

const mapDispatchToProps = {
  getIngredients: actions.getIngredients,
  addIngredient: actions.addIngredient,
  removeIngredient: actions.removeIngredient,
  purchaseBurgerInit: actions.purchaseBurgerInit,
  setAfterAuthRedirect: actions.setAfterAuthRedirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurguerBuilder, axiosOrders));
