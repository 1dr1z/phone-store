import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = (props) => {
  return (
    <div className={styles.backdrop} onClick={props.onToggle}>
      <div className={styles['backdrop-child']}>{props.children}</div>
    </div>
  );
};

export default Backdrop;
