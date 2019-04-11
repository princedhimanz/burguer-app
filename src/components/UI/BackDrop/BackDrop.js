import React from 'react';
import styles from './BackDrop.module.css';

function BackDrop({ show, clicked }) {
  return show ? <div className={styles.BackDrop} onClick={clicked} /> : null;
}

export default BackDrop;
