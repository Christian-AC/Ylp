import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Editreview from './index'


function EditBusinessModal({business, review}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button onClick={() => setShowModal(true)}>Edit Review</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} onSubmit={() => setShowModal(false)}>
            <Editreview business={business} review={review} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }
  export default EditBusinessModal;
