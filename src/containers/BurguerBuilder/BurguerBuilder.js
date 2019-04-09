import React, { useState } from 'react';

import Burger from '../../components/Burger/Burger';

const BurguerBuilder = props => {
  const [ingredients, setIngredients] = useState({
    salad: 1,
    bacon: 1,
    cheese: 2,
    meat: 2,
  });

  return (
    <React.Fragment>
      <Burger ingredients={ingredients} />
      <div>Build Controlls</div>
    </React.Fragment>
  );
};

export default BurguerBuilder;
