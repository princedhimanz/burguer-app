import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axiosOrders from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

const Orders = ({ orders, loading, getOrders }) => {
  useEffect(() => {
    getOrders();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      {orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ings}
          price={order.totalPrice}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ order }) => ({
  orders: order.orders,
  loading: order.loading,
});

const mapDispatchToProps = { getOrders: actions.getOrders };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axiosOrders));
