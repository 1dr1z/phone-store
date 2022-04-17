import React from 'react';
import { useDispatch } from 'react-redux';
import {
  addItemToCartAction,
  removeItemFromCartAction,
} from '../../store/actions/cart-actions';
import styles from './CartItem.module.css';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { cartItem } = props;

  const addItem = () => {
    dispatch(addItemToCartAction(cartItem));
  };

  const removeItem = () => {
    dispatch(removeItemFromCartAction(cartItem.id));
  };

  return (
    <div className={styles['cart-item']}>
      <div className={styles['left-side']}>
        <img src={cartItem.imgUrl} alt={cartItem.title} />
        <h4>{cartItem.name}</h4>
      </div>
      <div className={styles['right-side']}>
        <div className={styles.controls}>
          <div className={styles.remove} onClick={removeItem}>
            -
          </div>
          <div className={styles.quantity}>x{cartItem.totalItems}</div>
          <div className={styles.add} onClick={addItem}>
            +
          </div>
        </div>
        <div className={styles.total}>$ {cartItem.totalPrice}</div>
      </div>
    </div>
  );
};

export default CartItem;
