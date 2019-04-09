import React from 'react';
import PropTypes from 'prop-types';

import styles from './BuildControl.module.css';

const BuildControl = ({ label, added, removed, disabled }) => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{label}</div>
      {disabled ? null : (
        <button className={styles.Less} onClick={removed}>
          Less
        </button>
      )}
      <button className={styles.More} onClick={added}>
        More
      </button>
    </div>
  );
};

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
};

export default BuildControl;
