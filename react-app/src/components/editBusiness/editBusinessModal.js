import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBusiness from './index'


function EditBusinessModal({business}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button className="loginbutton" onClick={() => setShowModal(true)}>Edit Business</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} onSubmit={() => setShowModal(false)}>
            <EditBusiness business={business} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }
  export default EditBusinessModal;
