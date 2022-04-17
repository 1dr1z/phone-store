import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { phoneStoreSliceActions } from '../../store/slices/phone-store-slice';
import styles from './FilterPhoneList.module.css';

const FilterPhoneList = () => {
  const [sortingMethod, setSortingMethod] = useState('none');
  const dispatch = useDispatch();
  const changeSort = (event) => {
    setSortingMethod(event.target.value);
    dispatch(phoneStoreSliceActions.sortPhoneItems(event.target.value));
  };
  return (
    <div className={styles['form-field']}>
      <label htmlFor='filter-phone-list'>Filter by:</label>
      <select
        id='filter-phone-list'
        value={sortingMethod}
        onChange={changeSort}
      >
        <option value='none'>Filter data</option>
        <option value='asc'>The lowest first</option>
        <option value='desc'>The highest first</option>
      </select>
    </div>
  );
};

export default FilterPhoneList;
