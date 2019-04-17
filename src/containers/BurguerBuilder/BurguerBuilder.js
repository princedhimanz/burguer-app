import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ingredientAdded, ingredientRemoved } from '../../actions';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosOrders from '../../axios-orders';

const BurguerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   const getIngredients = async () => {
  //     setisLoading(true);
  //     try {
  //       const res = await axiosOrders.get('/ingredients.json');
  //       setIngredients(res.data);
  //     } catch (err) {
  //       setError(true);
  //       console.log(err);
  //     }
  //     setisLoading(false);
  //   };
  //   getIngredients();
  // }, []);

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

  function purchaseHandler() {
    setPurchasing(true);
  }

  function purchaseCancelHandler() {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.history.push('/checkout');
  };

  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {isLoading ? (
          <Spinner />
        ) : props.ings ? (
          <OrderSummary
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            ingredients={props.ings}
            price={props.totalPrice}
          />
        ) : null}
      </Modal>
      {props.ings ? (
        <React.Fragment>
          <Burger ingredients={props.ings} />
          <BuildControls
            ingredientAdded={props.ingredientAdded}
            ingredientRemoved={props.ingredientRemoved}
            disabled={disableInfo}
            totalPrice={props.totalPrice}
            ordered={purchaseHandler}
            purchasable={updatePurchaseState(props.ings)}
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

const mapStateToProps = state => ({
  ings: state.ingredients,
  totalPrice: state.totalPrice,
});

const mapDispatchToProps = { ingredientAdded, ingredientRemoved };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurguerBuilder, axiosOrders));
