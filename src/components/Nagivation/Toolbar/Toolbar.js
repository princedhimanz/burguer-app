import React from 'react';
import PropTypes from 'prop-types';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NagivationItems/NagivationItems';
import MenuToggler from './MenuToggler/MenuToggler';

const Toolbar = ({ toggleHandler, isAuth }) => {
  return (
    <header className={styles.Toolbar}>
      <MenuToggler clicked={toggleHandler} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly}>
        <NavigationItems isAuth={isAuth} />
      </nav>
    </header>
  );
};

Toolbar.propTypes = {
  toggleHandler: PropTypes.func.isRequired,
};

export default Toolbar;
