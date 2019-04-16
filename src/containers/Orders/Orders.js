import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axiosOrders from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axiosOrders.get('/orders.json');
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        setOrders(fetchedOrders);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getOrders();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      {orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.totalPrice}
        />
      ))}
    </div>
  );
};

export default withErrorHandler(Orders, axiosOrders);
