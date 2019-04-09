import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const Modal = props => {
  return (
    <div
      className={styles.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Modal;
