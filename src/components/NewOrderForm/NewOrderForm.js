import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from '../../Shared/Constants';
import { storeOrder } from '../../store/actions/orders-actions';
import styles from './NewOrderForm.module.css';

const NewOrderForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const [formIsTouched, setFormIsTouched] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const isValid = checkIfFormIsValid(fullName, email, phoneNumber, address);
    setFormIsValid(isValid);
    setFormIsTouched(true);
    if (formIsValid) {
      dispatch(
        storeOrder({
          fullName,
          email,
          phoneNumber,
          address,
          totalPrice: state.cart.totalPrice,
          totalItems: state.cart.totalItems,
          itemsInCart: state.cart.itemsInCart,
          userId: state.auth.userId,
        })
      );
      navigate('/');
    }
  };

  const fullNameHandler = (event) => {
    setFullName(event.target.value);
    const isValid = checkIfFormIsValid(
      event.target.value,
      email,
      phoneNumber,
      address
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
    const isValid = checkIfFormIsValid(
      fullName,
      event.target.value,
      phoneNumber,
      address
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const phoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
    const isValid = checkIfFormIsValid(
      fullName,
      email,
      event.target.value,
      address
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const addressHandler = (event) => {
    setAddress(event.target.value);
    const isValid = checkIfFormIsValid(
      fullName,
      email,
      phoneNumber,
      event.target.value
    );

    setFormIsValid(isValid);
    setFormIsTouched(true);
  };

  const checkIfFormIsValid = (fullName, email, phoneNumber, address) => {
    if (
      EMAIL_PATTERN.test(email) &&
      email !== '' &&
      fullName !== '' &&
      address !== '' &&
      phoneNumber !== '' &&
      PHONE_NUMBER_PATTERN.test(phoneNumber)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={styles['new-order-form-wrapper']}>
      <form onSubmit={formSubmitHandler}>
        <div className={styles['form-field']}>
          <label htmlFor='fullName'>Full Name:</label>
          <input
            type='text'
            id='fullName'
            value={fullName}
            onChange={fullNameHandler}
          />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='email'>Email:</label>
          <input type='text' id='email' value={email} onChange={emailHandler} />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='phoneNumber'>Phone number:</label>
          <input
            type='text'
            id='phoneNumber'
            value={phoneNumber}
            onChange={phoneNumberHandler}
          />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={addressHandler}
          />
        </div>
        <button type='submit' disabled={!formIsValid}>
          Order
        </button>
      </form>
      {formIsTouched && (
        <div className={styles['messages']}>
          {!formIsValid && <p className={styles['error']}>Form is not valid</p>}
          {state.ui.errorMessage && (
            <p className={styles['error']}>{state.ui.errorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NewOrderForm;
