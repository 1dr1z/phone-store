import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UsersList from '../../components/UsersList/UsersList';
import { RolesEnum } from '../../Shared/Enums/auth-role-enum';
import { fetchUsers } from '../../store/actions/users-actions';

const Users = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (role === RolesEnum.ADMIN) {
      dispatch(fetchUsers());
    }
  }, [dispatch, role]);
  return (
    <Fragment>
      {role !== RolesEnum.ADMIN && <Navigate to='/' />}
      {role === RolesEnum.ADMIN && (
        <Fragment>
          <UsersList />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Users;
