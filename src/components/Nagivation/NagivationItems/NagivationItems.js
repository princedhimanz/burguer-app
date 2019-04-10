import React from 'react';

import styles from './NagivationItems.module.css';
import NagivationItem from './NagivationItem/NagivationItem';

const NagivationItems = () => (
  <ul className={styles.NagivationItems}>
    <NagivationItem link="/" active>
      Burger Builder
    </NagivationItem>
    <NagivationItem link="/">Checkout</NagivationItem>
  </ul>
);

export default NagivationItems;
