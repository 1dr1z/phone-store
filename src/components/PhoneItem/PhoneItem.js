import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RolesEnum } from '../../Shared/Enums/auth-role-enum';
import { addItemToCartAction } from '../../store/actions/cart-actions';
import { deletePhoneAction } from '../../store/actions/phone-store-actions';
import styles from './PhoneItem.module.css';

const PhoneItem = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { phone } = props;
  const auth = useSelector((state) => state.auth);
  const addToBasket = () => {
    dispatch(addItemToCartAction(phone));
  };

  const deletePhone = () => {
    dispatch(deletePhoneAction(phone.id));
  };

  return (
    <div className={styles['phone-card']}>
      <Link state={{ phoneLocation: location }} to={`phone/${phone?.id}`}>
        <img src={phone?.imgUrl} alt={phone?.name} />
      </Link>
      <div className={styles['details-wrapper']}>
        <Link state={{ phoneLocation: location }} to={`phone/${phone?.id}`}>
          <div className={styles['phone-name']}>
            <h3>{phone?.name}</h3>
            <span>$&nbsp;{phone?.price}</span>
          </div>
        </Link>
        <div className={styles['actions']}>
          <div className={styles['manage-phone']}>
            {auth.isAuthenticated && auth.role === RolesEnum.ADMIN && (
              <Link to='phone/edit' state={{ phoneLocation: location, phone }}>
                <div className={`${styles['edit']} ${styles['icon']}`}>
                  <span></span>
                </div>
              </Link>
            )}
            {auth.isAuthenticated && auth.role === RolesEnum.ADMIN && (
              <div className={`${styles['delete']} ${styles['icon']}`}>
                <span onClick={deletePhone}></span>
              </div>
            )}
          </div>
          <div
            className={`${styles['add-to-basket']} ${styles['icon']}`}
            onClick={addToBasket}
          >
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneItem;
