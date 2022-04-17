import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RolesEnum } from '../../Shared/Enums/auth-role-enum';
import { updateUserRole } from '../../store/actions/users-actions';
import styles from './UsersItem.module.css';

const UsersItem = (props) => {
  const [role, setRole] = useState(props.user.role);
  const [showButton, setShowButton] = useState(false);
  const dispatch = useDispatch();
  const changeRole = (event) => {
    if (props.user.role !== event.target.value) {
      setShowButton(true);
    }
    setRole(event.target.value);
  };

  const updateRole = () => {
    if (props.user.role !== role) {
      setShowButton(false);
    }
    dispatch(updateUserRole({ ...props.user, role }));
  };

  return (
    <Fragment>
      <div className={styles['user-item-wrapper']}>
        <div className={styles['item']}>
          <p>Email:&nbsp;{props.user.email}</p>
          <div className={styles['form-field']}>
            <label htmlFor='role'>Role:</label>
            <select id='role' value={role} onChange={changeRole}>
              {Object.keys(RolesEnum).map((item) => {
                return (
                  item !== RolesEnum.ADMIN && (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                );
              })}
            </select>
          </div>
          <p>User id:&nbsp;{props.user.userId}</p>
        </div>
        {showButton && <button onClick={updateRole}>Update Role</button>}
      </div>
    </Fragment>
  );
};

export default UsersItem;
