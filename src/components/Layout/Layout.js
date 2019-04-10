import React, { useState } from 'react';

import styles from './Layout.module.css';
import Toolbar from '../Nagivation/Toolbar/Toolbar';
import SideDrawer from '../Nagivation/SideDrawer/SideDrawer';

const Layout = ({ children }) => {
  const [showSideDrawer, setshowSideDrawer] = useState(false);

  function sideDrawerClosedHandler() {
    setshowSideDrawer(false);
  }

  function sideDrawerToggler() {
    setshowSideDrawer(!showSideDrawer);
  }

  return (
    <React.Fragment>
      <Toolbar toggleHandler={sideDrawerToggler} />
      <SideDrawer opened={showSideDrawer} close={sideDrawerClosedHandler} />
      <main className={styles.content}>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
