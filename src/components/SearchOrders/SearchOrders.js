import React, { useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import styles from './SearchOrders.module.css';

const SearchOrders = (props) => {
  const [foundOrders, setFoundOrders] = useState([]);
  const [search, setSearch] = useState('');

  const searchHandler = (event) => {
    setSearch(event.target.value);
    setFoundOrders(
      props.items.filter((item) =>
        item.email.includes(event.target.value.trim())
      )
    );
    if (event.target.value === '') {
      setFoundOrders([]);
    }
  };
  return (
    <div className={styles['search-orders-wrapper']}>
      <div className={styles['form-field']}>
        <label htmlFor='order'>Search Order by Email:</label>
        <input type='text' id='order' value={search} onChange={searchHandler} />
      </div>
      {foundOrders.length > 0 && (
        <div className={styles['orders']}>
          {foundOrders.map((item) => {
            return <OrderItem key={item.orderKey} order={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchOrders;
