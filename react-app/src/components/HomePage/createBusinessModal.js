import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateBusiness from '../createBusiness';

function CreateBusinessModal({}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button className="Create-Business" onClick={() => setShowModal(true)}>Create Business</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} onSubmit={() => setShowModal(false)}>
            <CreateBusiness  setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }
  export default CreateBusinessModal;
