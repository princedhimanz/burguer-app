import React from 'react';
import PropTypes from 'prop-types';

import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NagivationItems/NagivationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';

const SideDrawer = ({ close, opened, isAuth }) => {
  return (
    <React.Fragment>
      <BackDrop show={opened} clicked={close} />
      <div
        className={`${styles.SideDrawer} ${
          opened ? styles.Open : styles.Close
        }`}
      >
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={isAuth} />
        </nav>
      </div>
    </React.Fragment>
  );
};

SideDrawer.propTypes = {
  close: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
};

export default SideDrawer;
