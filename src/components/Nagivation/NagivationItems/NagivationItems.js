import React from 'react';

import styles from './NagivationItems.module.css';
import NagivationItem from './NagivationItem/NagivationItem';

const NagivationItems = ({ isAuth }) => (
  <ul className={styles.NagivationItems}>
    <NagivationItem link="/">Burger Builder</NagivationItem>
    {isAuth ? <NagivationItem link="/orders">Orders</NagivationItem> : null}
    {isAuth ? (
      <NagivationItem link="/logout">Logout</NagivationItem>
    ) : (
      <NagivationItem link="/auth">Login</NagivationItem>
    )}
  </ul>
);

export default NagivationItems;
