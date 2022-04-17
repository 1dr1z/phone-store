import React from 'react';
import SignInUpForm from '../SignInUpForm/SignInUpForm';
import styles from './Signup.module.css';

const Signup = () => {
  return (
    <div className={styles['sign-up-wrapper']}>
      <h3>Sign up</h3>
      <SignInUpForm />
    </div>
  );
};

export default Signup;
