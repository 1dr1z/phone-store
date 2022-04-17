import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles['footer-wrapper']}>
      <p>All rights reserved &copy; {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
