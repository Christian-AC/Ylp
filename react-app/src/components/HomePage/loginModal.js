import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm'


function LoginModal({}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button className="HomePage-Button" onClick={() => setShowModal(true)}>Login</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} onSubmit={() => setShowModal(false)}>
            <LoginForm  setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }
  export default LoginModal;
