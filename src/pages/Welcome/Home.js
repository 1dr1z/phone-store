import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterPhoneList from '../../components/FilterPhoneList/FilterPhoneList';
import NewPhoneLink from '../../components/NewPhoneLink/NewPhoneLink';
import PhoneList from '../../components/PhoneList/PhoneList';
import { fetchPhones } from '../../store/actions/phone-store-actions';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.phoneStore.items);
  useEffect(() => {
    dispatch(fetchPhones());
  }, [dispatch]);

  return (
    <div className={styles['home-wrapper']}>
      {items.length > 0 && <FilterPhoneList />}
      {items.length > 0 && <PhoneList phoneList={items} />}
      {items.length === 0 && <h1>There are no phones on sale currently</h1>}
      <NewPhoneLink />
    </div>
  );
};

export default Home;
