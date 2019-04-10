import React from 'react';
import PropTypes from 'prop-types';

import styles from './MenuToggler.module.css';

const MenuToggler = ({ clicked }) => {
  return (
    <div className={styles.MenuToggler} onClick={clicked}>
      <div />
      <div />
      <div />
    </div>
  );
};

MenuToggler.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default MenuToggler;
