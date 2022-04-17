import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './CartLink.module.css';

const CartLink = () => {
  const totalItemsInCart = useSelector((state) => state.cart.totalItems);
  return (
    <li className={styles['cart-list-item']}>
      <NavLink to='/cart'>
        <div className={styles.cart}>
          <span className={styles.badge}>{totalItemsInCart}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default CartLink;
