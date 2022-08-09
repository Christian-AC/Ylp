import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReviewsThunk, deleteReviewThunk, updateReviewThunk } from "../../store/review"


function Editreview ({review, business, setShowModal}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user)

    const [userId] = useState((user.id));
    const [businessId] = useState((business.id));
    const [content, setContent] = useState(review.content);
    const [rating, setRating] = useState(review.rating)

    const updateContent = (e) => setContent(e.target.value);
    const updateRating = (e) => setRating(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            <input type='textarea' value={content} onChange={updateContent}/>
            <input type='text' value={rating} onChange={updateRating}/>
            <button className="button" type="submit">Edit</button>
            <div></div>
            <button onClick={(e)=>handleDeleteClick(e)}>Delete</button>
            </form>

        </>
    )
}

export default Editreview
