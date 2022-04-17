import React from 'react';
import PhoneItem from '../PhoneItem/PhoneItem';
import styles from './PhoneList.module.css';

const PhoneList = (props) => {
  return (
    <div className={styles['phone-list']}>
      {props.phoneList.map((item) => {
        return <PhoneItem key={item.id} phone={item} />;
      })}
    </div>
  );
};

export default PhoneList;
