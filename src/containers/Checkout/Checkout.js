import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = props => {
  const onCheckoutCancelled = () => {
    props.history.goBack();
  };

  const onCheckoutContinued = () => {
    props.history.replace('/checkout/contact-data');
  };

  return !props.ings ? (
    <Redirect to="/" />
  ) : props.purchased ? (
    <Redirect to="/" />
  ) : (
    <React.Fragment>
      <CheckoutSummary
        ingredients={props.ings}
        checkoutCancelled={onCheckoutCancelled}
        checkoutContinued={onCheckoutContinued}
      />
      <Route
        path={props.match.path + '/contact-data'}
        component={ContactData}
      />
    </React.Fragment>
  );
};

const mapStateToProps = ({ burgerBuilder, order }) => ({
  ings: burgerBuilder.ingredients,
  purchased: order.purchased,
});

export default connect(mapStateToProps)(Checkout);
