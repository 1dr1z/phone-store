import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { checkIfFormIsValid } from '../../Shared/utils/check-sign-form';
import {
  sendSignInRequestAction,
  sendSignUpRequestAction,
} from '../../store/actions/auth-actions';
import styles from './SignInUpForm.module.css';

const SignInUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const [formIsTouched, setFormIsTouched] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogin = location.pathname.includes('in');

  const emailHandler = (event) => {
    setEmail(event.target.value);
    const isValid = checkIfFormIsValid(event.target.value, password);
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
    const isValid = checkIfFormIsValid(email, event.target.value);
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };

  const handleSubmit = (event) => {
    const isValid = checkIfFormIsValid(email, password);
    setFormIsValid(isValid);
    event.preventDefault();
    if (isLogin && formIsValid) {
      dispatch(sendSignInRequestAction({ email, password }));
    }
    if (!isLogin && formIsValid) {
      dispatch(sendSignUpRequestAction({ email, password }));
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className={styles['sign-in-up-form']}>
        <div className={styles['form-field']}>
          <label htmlFor='email'>Email:</label>
          <input type='text' value={email} id='email' onChange={emailHandler} />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            value={password}
            id='password'
            onChange={passwordHandler}
          />
        </div>
        {isLogin && (
          <button type='submit' disabled={!formIsValid}>
            SIGN IN
          </button>
        )}
        {!isLogin && (
          <button type='submit' disabled={!formIsValid}>
            SIGN UP
          </button>
        )}
      </form>
      {formIsTouched && (
        <div className={styles['error-messages']}>
          {!formIsValid && <p>Form is not valid</p>}
        </div>
      )}
      <div className={styles['sign-in-up-links']}>
        {isLogin && <Link to='/sign/up'>Sign up</Link>}
        {!isLogin && <Link to='/sign/in'>Sign in</Link>}
      </div>
    </Fragment>
  );
};

export default SignInUpForm;
