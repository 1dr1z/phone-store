import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosRequests from '../../Shared/AxiosConfig/axios-non-auth-req';
import { addItemToCartAction } from '../../store/actions/cart-actions';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Modal from '../Modal/Modal';
import styles from './PhoneDetails.module.css';

const PhoneDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phone, setPhone] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const { id } = params;

  useEffect(() => {
    setShowSpinner(true);
    AxiosRequests.get(`/phones/${id}.json`)
      .then((res) => {
        setShowSpinner(false);
        setPhone(res.data);
      })
      .catch((error) => {
        setShowSpinner(false);
      });
  }, [id, dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  const addToCart = () => {
    dispatch(addItemToCartAction(phone));
  };

  return (
    <Modal>
      {!showSpinner && (
        <div className={styles['details-wrapper']}>
          <div
            onClick={addToCart}
            className={styles['add-to-cart-badge']}
          ></div>
          <div className={styles['data']}>
            <div className={styles['image-wrapper']}>
              <img src={phone?.imgUrl} alt={phone?.name} />
            </div>
            <div className={styles.details}>
              <h3>{phone?.name}</h3>
              <p className={styles.price}>Price:$&nbsp;{phone?.price}</p>
              <p className={styles.description}>{phone?.description}</p>
              <ul>
                <li>Internal Memory: {phone?.internalMemory}</li>
                <li>CPU: {phone?.cpu}</li>
                <li>RAM: {phone?.ram}</li>
                <li>Camera: {phone?.camera}</li>
                <li>Battery: {phone?.batteryCapacity}</li>
                <li>Dual SIM: {phone?.dualSim ? 'Yes' : 'No'}</li>
                <li>Screen Size: {phone?.screenSize}</li>
              </ul>
            </div>
          </div>
          <div className={styles['go-back']}>
            <span onClick={goBack}>Go Back</span>
          </div>
        </div>
      )}
      {showSpinner && <LoadingSpinner />}
    </Modal>
  );
};

export default PhoneDetails;
