import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ManagePhone from './components/ManagePhone/ManagePhone';
import NewOrder from './components/NewOrder/NewOrder';
import PhoneDetails from './components/PhoneDetails/PhoneDetails';
import Users from './pages/Users/Users';
import { initApp } from './store/actions/init-app';

const Login = React.lazy(() => import('./components/Login/Login'));
const Signup = React.lazy(() => import('./components/Signup/Signup'));
const Cart = React.lazy(() => import('./pages/Cart/Cart'));
const Orders = React.lazy(() => import('./pages/Orders/Orders'));
const SignInUp = React.lazy(() => import('./pages/SignInUp/SignInUp'));
const Home = React.lazy(() => import('./pages/Welcome/Home'));

function App() {
  let location = useLocation();
  let phoneLocation = location.state?.phoneLocation;
  let cartLocation = location.state?.cartLocation;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initApp());
  }, [dispatch]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes location={phoneLocation || cartLocation || location}>
        <Route path='/*' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='sign/*' element={<SignInUp />}>
            <Route index element={<Login />} />
            <Route path='in' element={<Login />} />
            <Route path='up' element={<Signup />} />
          </Route>
          <Route path='orders' element={<Orders />} />
          <Route path='manage-users' element={<Users />} />
          <Route path='cart' element={<Cart />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
      {(phoneLocation || cartLocation) && (
        <Routes>
          (
          <Route path='phone/:id' element={<PhoneDetails />} />
          <Route path='phone/new' element={<ManagePhone />} />
          <Route path='phone/edit' element={<ManagePhone />} />
          <Route path='cart/checkout' element={<NewOrder />} />)
        </Routes>
      )}
    </Suspense>
  );
}

export default App;
