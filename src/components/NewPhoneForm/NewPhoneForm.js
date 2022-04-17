import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  addNewPhone,
  editPhoneAction,
} from '../../store/actions/phone-store-actions';
import styles from './NewPhoneForm.module.css';

const NewPhoneForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [formIsValid, setFormIsValid] = useState(
    location.state.phone ? true : false
  );
  const [formIsTouched, setFormIsTouched] = useState(
    location.state.phone ? true : false
  );
  const [name, setName] = useState(
    location.state.phone ? location.state.phone.name : ''
  );
  const [imgUrl, setImgUrl] = useState(
    location.state.phone ? location.state.phone.imgUrl : ''
  );
  const [camera, setCamera] = useState(
    location.state.phone ? location.state.phone.camera : ''
  );
  const [CPU, setCPU] = useState(
    location.state.phone ? location.state.phone.CPU : ''
  );
  const [RAM, setRAM] = useState(
    location.state.phone ? location.state.phone.RAM : ''
  );
  const [internalMemory, setInternalMemory] = useState(
    location.state.phone ? location.state.phone.internalMemory : ''
  );
  const [screenSize, setScreenSize] = useState(
    location.state.phone ? location.state.phone.screenSize : ''
  );
  const [batteryCapacity, setBatteryCapacity] = useState(
    location.state.phone ? location.state.phone.batteryCapacity : ''
  );
  const [price, setPrice] = useState(
    location.state.phone ? location.state.phone.price : ''
  );
  const [dualSIM, setDualSIM] = useState(
    location.state.phone ? (location.state.phone.dualSim ? 'Yes' : 'No') : 'No'
  );
  const [description, setDescription] = useState(
    location.state.phone ? location.state.phone.description : ''
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const isValid = checkIfFormIsValid(
      name,
      imgUrl,
      camera,
      CPU,
      RAM,
      internalMemory,
      screenSize,
      batteryCapacity,
      price,
      dualSIM,
      description
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
    if (formIsValid) {
      if (location.state.phone) {
        dispatch(
          editPhoneAction({
            name,
            imgUrl,
            camera,
            CPU,
            RAM,
            internalMemory,
            screenSize,
            batteryCapacity,
            price,
            dualSIM,
            description,
            id: location.state.phone.id,
          })
        );
      } else {
        dispatch(
          addNewPhone({
            name,
            imgUrl,
            camera,
            CPU,
            RAM,
            internalMemory,
            screenSize,
            batteryCapacity,
            price,
            dualSIM,
            description,
          })
        );
      }
      navigate('/');
    }
  };

  const checkIfFormIsValid = (
    name,
    imgUrl,
    camera,
    CPU,
    RAM,
    internalMemory,
    screenSize,
    batteryCapacity,
    price,
    dualSIM,
    description
  ) => {
    if (
      name !== '' &&
      imgUrl !== '' &&
      camera !== '' &&
      CPU !== '' &&
      RAM !== '' &&
      internalMemory !== '' &&
      screenSize !== '' &&
      batteryCapacity !== '' &&
      price !== '' &&
      dualSIM !== '' &&
      description !== ''
    ) {
      return true;
    } else {
      return false;
    }
  };

  const nameHandler = (event) => {
    setName(event.target.value);
    const isValid = checkIfFormIsValid(
      event.target.value,
      imgUrl,
      camera,
      CPU,
      RAM,
      internalMemory,
      screenSize,
      batteryCapacity,
      price,
      dualSIM,
      description
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const imgUrlHandler = (event) => {
    setImgUrl(event.target.value);
    const isValid = checkIfFormIsValid(
      name,
      event.target.value,
      camera,
      CPU,
      RAM,
      internalMemory,
      screenSize,
      batteryCapacity,
      price,
      dualSIM,
      description
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const cameraHandler = (event) => {
    setCamera(event.target.value);
    const isValid = checkIfFormIsValid(
      name,
      imgUrl,
      event.target.value,
      CPU,
      RAM,
      internalMemory,
      screenSize,
      batteryCapacity,
      price,
      dualSIM,
      description
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const CPUHandler = (event) => {
    setCPU(event.target.value);
    const isValid = checkIfFormIsValid(
      name,
      imgUrl,
      camera,
      event.target.value,
      RAM,
      internalMemory,
      screenSize,
      batteryCapacity,
      price,
      dualSIM,
      description
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const RAMHandler = (event) => {
    setRAM(event.target.value);
    const isValid = checkIfFormIsValid(
      name,
      imgUrl,
      camera,
      CPU,
      event.target.value,
      internalMemory,
      screenSize,
      batteryCapacity,
      price,
      dualSIM,
      description
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const internalMemoryHandler = (event) => {
    setInternalMemory(event.target.value);
    const isValid = checkIfFormIsValid(
      name,
      imgUrl,
      camera,
      CPU,
      RAM,
      event.target.value,
      screenSize,
      batteryCapacity,
      price,
      dualSIM,
      description
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const screenSizeHandler = (event) => {
    setScreenSize(event.target.value);
    const isValid = checkIfFormIsValid(
      name,
      imgUrl,
      camera,
      CPU,
      RAM,
      internalMemory,
      event.target.value,
      batteryCapacity,
      price,
      dualSIM,
      description
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const batteryCapacityHandler = (event) => {
    setBatteryCapacity(event.target.value);
    const isValid = checkIfFormIsValid(
      name,
      imgUrl,
      camera,
      CPU,
      RAM,
      internalMemory,
      screenSize,
      event.target.value,
      price,
      dualSIM,
      description
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const priceHandler = (event) => {
    setPrice(event.target.value);
    const isValid = checkIfFormIsValid(
      name,
      imgUrl,
      camera,
      CPU,
      RAM,
      internalMemory,
      screenSize,
      batteryCapacity,
      event.target.value,
      dualSIM,
      description
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const dualSIMHandler = (event) => {
    setDualSIM(event.target.value);
    const isValid = checkIfFormIsValid(
      name,
      imgUrl,
      camera,
      CPU,
      RAM,
      internalMemory,
      screenSize,
      batteryCapacity,
      price,
      event.target.value,
      description
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
    const isValid = checkIfFormIsValid(
      name,
      imgUrl,
      camera,
      CPU,
      RAM,
      internalMemory,
      screenSize,
      batteryCapacity,
      price,
      dualSIM,
      event.target.value
    );
    setFormIsValid(isValid);
    setFormIsTouched(true);
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles['phone-form-wrapper']}>
      <div className={styles['heading']}>
        <span onClick={goBack}>X</span>
        <h4>Add/Edit phone</h4>
      </div>
      <form onSubmit={formSubmitHandler}>
        <div className={styles['form-field']}>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' value={name} onChange={nameHandler} />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='imgUrl'>Image url:</label>
          <input
            type='text'
            id='imgUrl'
            value={imgUrl}
            onChange={imgUrlHandler}
          />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='name'>Camera:</label>
          <input
            type='text'
            id='camera'
            value={camera}
            onChange={cameraHandler}
          />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='cpu'>CPU:</label>
          <input type='text' id='cpu' value={CPU} onChange={CPUHandler} />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='ram'>RAM:</label>
          <input type='text' id='ram' value={RAM} onChange={RAMHandler} />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='internalMemory'>Internal memory:</label>
          <input
            type='text'
            id='internalMemory'
            value={internalMemory}
            onChange={internalMemoryHandler}
          />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='screenSize'>Screen size:</label>
          <input
            type='text'
            id='screenSize'
            value={screenSize}
            onChange={screenSizeHandler}
          />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='batteryCapacity'>Battery capacity:</label>
          <input
            type='text'
            id='batteryCapacity'
            value={batteryCapacity}
            onChange={batteryCapacityHandler}
          />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='price'>Price:</label>
          <input type='text' id='price' value={price} onChange={priceHandler} />
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='dualSim'>Dual SIM:</label>
          <select id='dualSim' value={dualSIM} onChange={dualSIMHandler}>
            <option value='No'>No</option>
            <option value='Yes'>Yes</option>
          </select>
        </div>
        <div className={styles['form-field']}>
          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            cols='30'
            rows='10'
            value={description}
            onChange={descriptionHandler}
          />
        </div>
        <button type='submit' disabled={!formIsValid}>
          Submit form
        </button>
      </form>
      {formIsTouched && (
        <div className={styles['messages']}>
          {!formIsValid && <p className={styles['error']}>Form is not valid</p>}
        </div>
      )}
    </div>
  );
};

export default NewPhoneForm;
