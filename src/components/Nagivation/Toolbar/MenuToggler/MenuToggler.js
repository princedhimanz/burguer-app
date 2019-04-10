import React from 'react';
import PropTypes from 'prop-types';

const MenuToggler = ({ clicked }) => {
  return <div onClick={clicked}>Menu</div>;
};

MenuToggler.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default MenuToggler;
