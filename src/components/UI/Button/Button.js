import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ btnType, clicked, children }) => {
  return (
    <button className={`${styles.Button} ${styles[btnType]}`} onClick={clicked}>
      {children}
    </button>
  );
};

Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default Button;
