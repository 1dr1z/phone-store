import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RolesEnum } from '../../Shared/Enums/auth-role-enum';
import SearchUsers from '../SearchUsers/SearchUsers';
import UsersItem from '../UsersItem/UsersItem';
import styles from './UsersList.module.css';

const UsersList = () => {
  const items = useSelector((state) => state.users.users);
  return (
    <Fragment>
      {items.length > 0 && (
        <Fragment>
          <SearchUsers items={items} />
          <div className={styles['users-list-wrapper']}>
            {items.map((item) => {
              return (
                item.role !== RolesEnum.ADMIN && (
                  <UsersItem key={item.userKey} user={item} />
                )
              );
            })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UsersList;
