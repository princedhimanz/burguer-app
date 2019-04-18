import React from 'react';

import styles from './NagivationItems.module.css';
import NagivationItem from './NagivationItem/NagivationItem';

const NagivationItems = () => (
  <ul className={styles.NagivationItems}>
    <NagivationItem link="/">Burger Builder</NagivationItem>
    <NagivationItem link="/orders">Orders</NagivationItem>
    <NagivationItem link="/auth">Login</NagivationItem>
  </ul>
);

export default NagivationItems;
