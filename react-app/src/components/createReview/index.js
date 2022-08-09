import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createReviewThunk, getReviewsThunk} from '../../store/review';


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
    const updateRating = (e) => setRating(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let error = false;
        if(content === '') {
            errorsObj.name = "Review can't be left blank";
            error = true;
          } else if (content.length < 4 || content.length > 500) {
            errorsObj.name = "Review must be longer than 4 characters and shorter than 500";
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
        <>
        <h1>Add a reivew</h1>
        <form className="review-form" onSubmit={handleSubmit}>
            {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
            <textarea type='textarea' value={content} placeHolder="content" onChange={updateContent}/>
            <input type='text' value={rating} onChange={updateRating}/>
            <button className="button" type="submit">Submit</button>
        </form>
        </>
    )

}

export default CreateReview
