import React from 'react';
import SignInUpForm from '../SignInUpForm/SignInUpForm';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles['login-wrapper']}>
      <h3>Sign in</h3>
      <SignInUpForm />
    </div>
  );
};

export default Login;
