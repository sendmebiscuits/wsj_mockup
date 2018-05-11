import React,{ Component } from 'react';
import ReactModal from 'react-modal';

const Modal = ({isOpen, ariaHideApp, className, onRequestClose}) => {
  return (
    <ReactModal isOpen={isOpen}
                ariaHideApp={ariaHideApp}
                className={className}
                onRequestClose={onRequestClose}>
      <br/>
      <p className='modal_text'>
        You should subscribe if you want your articles without any trouble.
        <br/><br/><br/>
        Otherwise, you may need to find your article a couple of times.
      </p>
      <div className='sub_btn'>
        <button onClick={onRequestClose}>
          Subscribe
        </button>
      </div>
    </ReactModal>
    );
}

export default Modal;