import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RolesEnum } from '../../Shared/Enums/auth-role-enum';
import { isActiveRoute } from '../../Shared/utils/active-route';
import { authActions } from '../../store/slices/auth-slice';
import { cartActions } from '../../store/slices/cart-slice';
import CartLink from '../CartLink/CartLink';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [showNav, setShowNav] = useState(true);
  const [closeMenuIcon, setCloseMenuIcon] = useState(true);
  const [openMenuIcon, setOpenMenuIcon] = useState(true);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const changeHandler = (event) => {
    if (event.target.innerWidth > 600) {
      setShowNav(true);
      setOpenMenuIcon(false);
      setCloseMenuIcon(false);
    } else {
      setShowNav(false);
      setOpenMenuIcon(true);
      setCloseMenuIcon(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth > 600) {
      setShowNav(true);
      setOpenMenuIcon(false);
      setCloseMenuIcon(false);
    } else {
      setShowNav(false);
      setOpenMenuIcon(true);
      setCloseMenuIcon(false);
    }
  }, []);
  window.addEventListener('resize', changeHandler);

  const menuHandler = (event) => {
    if (event.view.innerWidth <= 600) {
      setShowNav((prevState) => (prevState = !prevState));
      setOpenMenuIcon((prevState) => (prevState = !prevState));
      setCloseMenuIcon((prevState) => (prevState = !prevState));
    }
  };

  const logout = () => {
    dispatch(authActions.logout());
    dispatch(cartActions.clearCart());
    navigate('/', { replace: true });
  };
  return (
    <Fragment>
      <header className={styles['navigation-wrapper']}>
        <nav>
          <div>
            <NavLink
              className={(navData) => isActiveRoute(navData, styles)}
              to='/'
            >
              Phone Store
            </NavLink>
          </div>

          {closeMenuIcon && (
            <span
              className={`${styles['close']} ${styles['icon']}`}
              onClick={menuHandler}
            />
          )}
          {openMenuIcon && (
            <span
              className={`${styles['open']} ${styles['icon']}`}
              onClick={menuHandler}
            />
          )}

          {showNav && (
            <ul onClick={menuHandler}>
              <li>
                <NavLink
                  className={(navData) => isActiveRoute(navData, styles)}
                  to='/'
                >
                  Home
                </NavLink>
              </li>
              {auth.isAuthenticated &&
                (auth.role === RolesEnum.ADMIN ||
                  auth.role === RolesEnum.SELLER) && (
                  <li>
                    <NavLink
                      className={(navData) => isActiveRoute(navData, styles)}
                      to='/orders'
                    >
                      Orders
                    </NavLink>
                  </li>
                )}
              {auth.isAuthenticated && auth.role === RolesEnum.ADMIN && (
                <li>
                  <NavLink
                    className={(navData) => isActiveRoute(navData, styles)}
                    to='/manage-users'
                  >
                    Users
                  </NavLink>
                </li>
              )}
              {!auth.isAuthenticated && (
                <li>
                  <NavLink
                    className={(navData) => isActiveRoute(navData, styles)}
                    to='/sign/in'
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {auth.isAuthenticated && (
                <li onClick={logout}>
                  <NavLink to='/'>Logout</NavLink>
                </li>
              )}
              <CartLink />
            </ul>
          )}
        </nav>
      </header>
    </Fragment>
  );
};

export default Navigation;
