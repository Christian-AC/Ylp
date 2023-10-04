import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from '../auth/SignUpForm'


function SignupModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button className="new-to-YLP" onClick={() => setShowModal(true)}>Sign up!</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} onSubmit={() => setShowModal(false)}>
            <SignUpForm setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }
  export default SignupModal;
