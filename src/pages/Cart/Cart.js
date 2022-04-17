import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';

const Cart = () => {
  const location = useLocation();
  const cartState = useSelector((state) => state.cart);
  return (
    <div className={styles['cart-wrapper']}>
      <div className={styles['total-price-badge']}>
        Total Price: $&nbsp;{cartState.totalPrice}
      </div>
      {cartState.itemsInCart.map((item) => {
        return <CartItem key={item.id} cartItem={item} />;
      })}
      {cartState.itemsInCart.length === 0 && (
        <h1 className={styles.message}>There aro no items in cart</h1>
      )}
      {cartState.itemsInCart.length > 0 && (
        <div className={styles['proceed-to-checkout']}>
          <Link to='checkout' state={{ cartLocation: location }}>
            Proceed to checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
