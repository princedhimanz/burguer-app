import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './NagivationItem.module.css';

const NagivationItem = ({ link, children, close }) => {
  return (
    <li className={styles.NagivationItem} onClick={close}>
      <NavLink exact activeClassName={styles.active} to={link}>
        {children}
      </NavLink>
    </li>
  );
};

NagivationItem.propTypes = {
  link: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

export default NagivationItem;
