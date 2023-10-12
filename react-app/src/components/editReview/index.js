import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReviewsThunk, deleteReviewThunk, updateReviewThunk } from "../../store/review"
import {FaStar} from 'react-icons/fa'


function Editreview ({review, business, setShowModal}) {
    const dispatch = useDispatch();
    const history = useHistory();

    let errorsObj = {content: ''};

    const user = useSelector((state) => state.session.user)

    const [userId] = useState((user.id));
    const [businessId] = useState((business.id));
    const [content, setContent] = useState(review.content);
    const [rating, setRating] = useState(review.rating)
    const [errors, setErrors] = useState(errorsObj);
    const [hover, setHover] =useState(null)

    const updateContent = (e) => setContent(e.target.value);
    // const updateRating = (e) => setRating(e.target.value)

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

        if(!error){
            const updateReview = {
                userId,
                businessId,
                content,
                rating
            }
            await dispatch(updateReviewThunk(updateReview, review.id))
            await dispatch(getReviewsThunk(business.id))
            setShowModal(false)
        }
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        console.log("ReviewId ====",review.id)
        let deleteReview = await dispatch(deleteReviewThunk(review.id));
        setShowModal(false)
            if(deleteReview) {
                await dispatch(getReviewsThunk(business.id))
                setShowModal(false)
                alert('Review Deleted')
            }
    }


    return(
        <>
            <form className='review-form' onSubmit={handleSubmit}>
                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                <div className="review-form-line">
                    <textarea rows="10" cols="50" className='review-textarea' value={content} placeHolder="content" onChange={updateContent} required />
                </div>
                <div>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
            return(
                <label>
                    <input
                        type='radio'
                        name='rating'
                        value={currentRating}
                        onClick={() => setRating(currentRating)}
                        />
                        <FaStar
                            clssName='star'
                            size={50}
                            color={currentRating <=  (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                            />
                </label>
            )

            })}
            </div>
                <div className="review-button-container">
                    <button className="Create-Business" type="submit">Edit</button>
                    <button className="Create-Business" onClick={(e) => handleDeleteClick(e)}>Delete</button>
                </div>
            </form>

        </>
    )
}

export default Editreview
