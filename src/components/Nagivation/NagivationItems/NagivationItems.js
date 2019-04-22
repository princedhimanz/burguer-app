import React from 'react';

import styles from './NagivationItems.module.css';
import NagivationItem from './NagivationItem/NagivationItem';

const NagivationItems = ({ isAuth, close }) => (
  <ul className={styles.NagivationItems}>
    <NagivationItem close={close} link="/">
      Burger Builder
    </NagivationItem>
    {isAuth ? (
      <NagivationItem close={close} link="/orders">
        Orders
      </NagivationItem>
    ) : null}
    {isAuth ? (
      <NagivationItem close={close} link="/logout">
        Logout
      </NagivationItem>
    ) : (
      <NagivationItem close={close} link="/auth">
        Login
      </NagivationItem>
    )}
  </ul>
);

export default NagivationItems;
