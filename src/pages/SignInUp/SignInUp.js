import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const SignInUp = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [isAuthenticated, navigate]);
  return <Fragment>{!isAuthenticated && <Outlet />}</Fragment>;
};

export default SignInUp;
