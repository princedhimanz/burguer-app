import React from 'react';
import PropTypes from 'prop-types';

import styles from './Toolbar.module.css';
import Logo from '../Logo/Logo';

const Toolbar = props => {
  return (
    <header className={styles.Toolbar}>
      <div>MENU</div>
      <Logo />
      <nav>...</nav>
    </header>
  );
};

Toolbar.propTypes = {};

export default Toolbar;
