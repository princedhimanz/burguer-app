import React from 'react';
import PropTypes from 'prop-types';

import styles from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Nagivation/NagivationItems/NagivationItems';

const Toolbar = () => {
  return (
    <header className={styles.Toolbar}>
      <div>MENU</div>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
};

Toolbar.propTypes = {};

export default Toolbar;
