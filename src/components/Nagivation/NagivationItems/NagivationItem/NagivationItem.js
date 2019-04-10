import React from 'react';
import PropTypes from 'prop-types';

import styles from './NagivationItem.module.css';

const NagivationItem = ({ link, active, children }) => {
  return (
    <li className={styles.NagivationItem}>
      <a href="/" className={active ? styles.active : null}>
        {children}
      </a>
    </li>
  );
};

NagivationItem.propTypes = {
  link: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

export default NagivationItem;
