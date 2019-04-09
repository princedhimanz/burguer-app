import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';

const Modal = props => {
  return (
    <React.Fragment>
      <BackDrop show={props.show} clicked={props.modalClosed} />
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
};

export default Modal;
