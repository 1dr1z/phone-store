import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import OrderItem from '../OrderItem/OrderItem';
import SearchOrders from '../SearchOrders/SearchOrders';
import styles from './OrdersList.module.css';

const OrdersList = () => {
  const orders = useSelector((state) => state.orders);
  return (
    <Fragment>
      {orders.processedOrders.length === 0 &&
        orders.unprocessedOrders.length === 0 && (
          <h3 className={styles['no-orders']}>
            There are no orders in the database
          </h3>
        )}
      {(orders.processedOrders.length > 0 ||
        orders.unprocessedOrders.length > 0) && (
        <div className={styles['orders-wrapper']}>
          <SearchOrders
            items={[...orders.unprocessedOrders, ...orders.processedOrders]}
          />
          <div className={styles['orders']}>
            <h4>Unprocessed Orders:</h4>
            <div className={styles['order-items']}>
              {orders.unprocessedOrders.length > 0 ? (
                orders.unprocessedOrders.map((item) => {
                  return <OrderItem key={item.orderKey} order={item} />;
                })
              ) : (
                <p className={styles['no-orders']}>
                  There are no unprocessed orders
                </p>
              )}
            </div>
          </div>
          <div className={styles['orders']}>
            <h4>Processed Orders:</h4>
            <div className={styles['order-items']}>
              {orders.processedOrders.length > 0 ? (
                orders.processedOrders.map((item) => {
                  return <OrderItem key={item.orderKey} order={item} />;
                })
              ) : (
                <p className={styles['no-orders']}>
                  There are no processed orders
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrdersList;
