import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import NewOrderForm from '../NewOrderForm/NewOrderForm';
import styles from './NewOrder.module.css';

const NewOrder = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Modal>
      <div className={styles['new-order-wrapper']}>
        <span className={styles['go-back']} onClick={goBack}>
          X
        </span>
        {isAuthenticated && (
          <div className={styles['form-and-data']}>
            <NewOrderForm />
            <div className={styles.data}>
              <p>Total Price: $&nbsp;{state.cart.totalPrice}</p>
              <p>Total Items: {state.cart.totalItems}</p>
              <ul>
                {state.cart.itemsInCart.map((item) => {
                  return (
                    <li key={item.id}>
                      -&nbsp;{item.name} | $&nbsp;{item.price} x{' '}
                      {item.totalItems} = $&nbsp;{item.totalPrice}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        {!isAuthenticated && (
          <div className={styles['sign-in-up-form']}>
            <h3>You need to sign in/up to proceed to checkout!</h3>
            <Link to='/sign/in'>Sign in</Link>
            <Link to='/sign/up'>Sign up</Link>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NewOrder;
