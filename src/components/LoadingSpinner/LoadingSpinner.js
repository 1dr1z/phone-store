import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <Backdrop>
      <div className={styles['lds-ring']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Backdrop>
  );
};

export default LoadingSpinner;
