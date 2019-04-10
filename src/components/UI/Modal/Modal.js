import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';

const Modal = React.memo(
  ({ show, modalClosed, children }) => {
    return (
      <React.Fragment>
        <BackDrop show={show} clicked={modalClosed} />
        <div
          className={styles.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0',
          }}
        >
          {children}
        </div>
      </React.Fragment>
    );
  },
  (prevProp, newProp) => {
    return prevProp.show === newProp.show;
  }
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
};

export default Modal;
