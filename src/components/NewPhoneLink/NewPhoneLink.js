import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RolesEnum } from '../../Shared/Enums/auth-role-enum';
import styles from './NewPhoneLink.module.css';

const NewPhoneLink = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  return (
    <Fragment>
      {auth.isAuthenticated && auth.role === RolesEnum.ADMIN && (
        <div className={styles['add-phone']}>
          <Link to='phone/new' state={{ phoneLocation: location }}>
            <span />
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default NewPhoneLink;
