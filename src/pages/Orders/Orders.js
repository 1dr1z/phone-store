import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import OrdersList from '../../components/OrdersList/OrdersList';
import { RolesEnum } from '../../Shared/Enums/auth-role-enum';
import { fetchOrders } from '../../store/actions/orders-actions';

const Orders = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Fragment>
      {!auth.isAuthenticated &&
        (auth.role !== RolesEnum.ADMIN || auth.role !== RolesEnum.SELLER) && (
          <Navigate to='/' />
        )}
      {auth.isAuthenticated &&
        (auth.role === RolesEnum.ADMIN || auth.role === RolesEnum.SELLER) && (
          <OrdersList />
        )}
    </Fragment>
  );
};

export default Orders;
