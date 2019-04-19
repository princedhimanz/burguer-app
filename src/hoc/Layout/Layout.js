import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Layout.module.css';
import Toolbar from '../../components/Nagivation/Toolbar/Toolbar';
import SideDrawer from '../../components/Nagivation/SideDrawer/SideDrawer';

const Layout = ({ children, isAuthenticated }) => {
  const [showSideDrawer, setshowSideDrawer] = useState(false);

  function sideDrawerClosedHandler() {
    setshowSideDrawer(false);
  }

  function sideDrawerToggler() {
    setshowSideDrawer(!showSideDrawer);
  }

  return (
    <React.Fragment>
      <Toolbar isAuth={isAuthenticated} toggleHandler={sideDrawerToggler} />
      <SideDrawer
        isAuth={isAuthenticated}
        opened={showSideDrawer}
        close={sideDrawerClosedHandler}
      />
      <main className={styles.content}>{children}</main>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
