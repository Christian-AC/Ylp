import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createReviewThunk, getReviewsThunk} from '../../store/review';
import './createReview.css'

function CreateReview({business, setShowModal}) {
    const dispatch = useDispatch();
    const history = useHistory();

    let errorsObj = {content: ''};

    const user = useSelector(state => state.session.user)
    const [userId] = useState((user.id));
    const [businessId] = useState((business.id));
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);
    const [errors, setErrors] = useState(errorsObj);

    const updateContent = (e) => setContent(e.target.value);
    // const updateRating = (e) => setRating(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let error = false;
        if(content === '') {
            errorsObj.content = "Review can't be left blank";
            error = true;
          } else if (content.length < 4 || content.length > 500) {
            errorsObj.content = "Review must be longer than 4 characters and shorter than 500";
            error = true;
          }
        setErrors(errorsObj);

        if(!error) {
            const createdReview = {
                userId,
                businessId,
                content,
                rating
            }
            await dispatch(createReviewThunk(createdReview));
            await dispatch(getReviewsThunk(business.id))
            setShowModal(false)
        }
    }

    return (

    <div className="review-form">
        <h2 className='loginform-text-intro'>Write a Review</h2>
            {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
        <form onSubmit={handleSubmit}>
                <div className="rating-form-line">
                    <label className="rating-label">Rating</label>
                    <select className='review-select'  type='text' value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="review-form-line">
                    <textarea rows="10" cols="50" className='review-textarea' value={content} placeHolder="Review" onChange={updateContent} required/>
                </div>
                <button className="Create-review" type="submit">Submit</button>
        </form>
    </div>
    )

}

export default CreateReview
