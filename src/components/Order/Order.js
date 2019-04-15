import React from 'react';

import styles from './Order.module.css';

const Order = ({ ingredients, price }) => {
  const ingredientsArr = [];
  for (let ingredientName in ingredients) {
    ingredientsArr.push({
      name: ingredientName,
      amount: ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredientsArr.map(ig => (
    <span
      key={ig.name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px',
      }}
    >
      {ig.name} ({ig.amount})
    </span>
  ));

  return (
    <div className={styles.Order}>
      <p>
        Ingredients:
        {ingredientOutput}
      </p>
      <p>
        Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
