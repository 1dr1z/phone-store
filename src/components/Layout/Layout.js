import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { uiSliceActions } from '../../store/slices/ui-slice';
import Footer from '../Footer/Footer';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Navigation from '../Navigation/Navigation';
import styles from './Layout.module.css';

const Layout = () => {
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = ui;
  const { numberOfRunningSpinners } = useSelector(
    (state) => state.ui.numberOfRunningSpinners
  );

  useEffect(() => {
    setTimeout(() => {
      if (successMessage) {
        dispatch(uiSliceActions.setSuccessMessage(null));
      }
      if (errorMessage) {
        dispatch(uiSliceActions.setErrorMessage(null));
      }
    }, 5000);
  }, [dispatch, successMessage, errorMessage]);

  return (
    <Fragment>
      <Navigation></Navigation>
      <main className={styles['main-element']}>
        {(successMessage || errorMessage) && (
          <div
            className={styles['messages']}
            style={{
              border: `solid 2px ${
                successMessage ? 'rgb(24, 150, 45)' : 'rgb(232, 19, 19)'
              }`,
            }}
          >
            {successMessage && (
              <p className={styles.success}>{successMessage}</p>
            )}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </div>
        )}
        <Outlet />
      </main>
      {numberOfRunningSpinners > 0 && <LoadingSpinner />}
      <Footer></Footer>
    </Fragment>
  );
};

export default Layout;
