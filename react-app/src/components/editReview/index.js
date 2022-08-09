import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReviewsThunk, deleteReviewThunk, updateReviewThunk } from "../../store/review"


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
            if(deleteReview) {
                await dispatch(getReviewsThunk(business.id))
                setShowModal(false)
                alert('Review Deleted')
            }
    }


    return(
        <>
            <form className='review-form' onSubmit={handleSubmit}>
            <h2>Edit Review</h2>
            {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
            <input type='textarea' value={content} onChange={updateContent}/>
            <h4>Rating:</h4>
            <select type='text' value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
            <button className="button" type="submit">Edit</button>
            <div></div>
            <button onClick={(e)=>handleDeleteClick(e)}>Delete</button>
            </form>

        </>
    )
}

export default Editreview
