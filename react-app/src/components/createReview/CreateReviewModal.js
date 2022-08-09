import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './index'


function CreateReviewModal({business}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button onClick={() => setShowModal(true)}>Add your review!</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} onSubmit={() => setShowModal(false)}>
            <CreateReview business={business} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }
  export default CreateReviewModal;
