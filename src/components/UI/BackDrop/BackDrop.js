import React from 'react';
import PropTypes from 'prop-types';

import styles from './BackDrop.module.css';

function BackDrop({ show, clicked }) {
  return show ? <div className={styles.BackDrop} onClick={clicked} /> : null;
}

BackDrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default BackDrop;
