import React, { useState } from 'react';
import UsersItem from '../UsersItem/UsersItem';
import styles from './SearchUsers.module.css';

const SearchUsers = (props) => {
  const [foundUsers, setFoundUsers] = useState([]);
  const [search, setSearch] = useState('');

  const searchHandler = (event) => {
    setSearch(event.target.value);
    setFoundUsers(
      props.items.filter((item) =>
        item.email.includes(event.target.value.trim())
      )
    );
    if (event.target.value === '') {
      setFoundUsers([]);
    }
  };
  return (
    <div className={styles['search-users-wrapper']}>
      <div className={styles['form-field']}>
        <label htmlFor='user'>Search user by Email:</label>
        <input type='text' id='user' value={search} onChange={searchHandler} />
      </div>
      {foundUsers.length > 0 && (
        <div className={styles['users']}>
          {foundUsers.map((item) => {
            return <UsersItem key={item.userKey} user={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchUsers;
