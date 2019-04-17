import React from 'react';
import { Route } from 'react-router-dom';
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

  return (
    <div>
      <CheckoutSummary
        ingredients={props.ings}
        checkoutCancelled={onCheckoutCancelled}
        checkoutContinued={onCheckoutContinued}
      />
      <Route
        path={props.match.path + '/contact-data'}
        component={ContactData}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  ings: state.ingredients,
});

export default connect(mapStateToProps)(Checkout);
