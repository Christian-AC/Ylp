import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Editreview from './index'


function EditReviewModal({business, review}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button  className="signup-bottons" onClick={() => setShowModal(true)}>Edit Review</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} onSubmit={() => setShowModal(false)}>
            <Editreview business={business} review={review} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }
  export default EditReviewModal;
