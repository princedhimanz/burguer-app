import React, { useState } from 'react';

import Burger from '../../components/Burger/Burger';

const BurguerBuilder = props => {
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });

  return (
    <React.Fragment>
      <Burger ingredients={ingredients} />
      <div>Build Controlls</div>
    </React.Fragment>
  );
};

export default BurguerBuilder;
