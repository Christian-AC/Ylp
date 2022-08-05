import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createReviewThunk, getReviewsThunk} from '../../store/review'


function CreateReview({business}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)

    const [userId] = useState((user.id));
    const [businessId] = useState((business.id));
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);

    const updateContent = (e) => setContent(e.target.value);
    const updateRating = (e) => setRating(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const createdReview = {
            userId,
            businessId,
            content,
            rating
        }

        await dispatch(createReviewThunk(createdReview));
        await dispatch(getReviewsThunk(businessId))
        alert('Review Created')

    }

    return (
        <>
        <h1>Add a reivew</h1>
        <form className="review-form" onSubmit={handleSubmit}>
            <textarea type='textarea' value={content} placeHolder="content" onChange={updateContent}/>
            <input type='text' value={rating} onChange={updateRating}/>
            <button className="button" type="submit">Submit</button>
        </form>
        </>
    )

}

export default CreateReview
