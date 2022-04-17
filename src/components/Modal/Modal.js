import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onToggle={props.toggleModal}>{props.children}</Backdrop>,
        document.getElementById('modal')
      )}
    </Fragment>
  );
};

export default Modal;
