import React from 'react';
import { useDispatch } from 'react-redux';
import { markOrderAsProcessedAction } from '../../store/actions/orders-actions';
import styles from './OrderItem.module.css';

const OrderItem = (props) => {
  const dispatch = useDispatch();

  const markOrderAsProcessed = () => {
    dispatch(markOrderAsProcessedAction(props.order));
  };

  return (
    <div className={styles['order-item-wrapper']}>
      <p>
        <span>Full Name:</span>&nbsp;{props.order?.fullName}
      </p>
      <p>
        <span>Email:</span>&nbsp;{props.order?.email}
      </p>
      <p>
        <span>Phone Number:</span>&nbsp;{props.order?.phoneNumber}
      </p>
      <p>
        <span>Address:</span>&nbsp;{props.order?.address}
      </p>
      {props.order?.itemsInCart.map((item) => {
        return (
          <div key={item.id}>
            <p>
              <span>Phone Name:</span>&nbsp;{item.name}
            </p>
            <p>
              <span>Phone Price:</span>&nbsp;$&nbsp;{item.price}
            </p>
            <p>
              <span>Total Items:</span>&nbsp;{item.totalItems}
            </p>
          </div>
        );
      })}
      <p>
        <span>Total price:</span>&nbsp;$&nbsp;{props.order?.totalPrice}
      </p>
      <p>
        <span>Total items:</span>&nbsp;{props.order?.totalItems}
      </p>
      <p>
        <span>Order Processed:</span>&nbsp;
        {props.order?.orderProcessed ? 'Yes' : 'No'}
      </p>
      {!props.order.orderProcessed && (
        <div className={styles['actions-wrapper']}>
          <button onClick={markOrderAsProcessed}>Mark as processed</button>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
