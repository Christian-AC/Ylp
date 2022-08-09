import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/review";
import  Editreview  from "../editReview/index"



function BusinessReviews({business}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const businessId = business.id;

    const user = useSelector((state) => state.session.user)
    const reviews = useSelector((state) => Object.values(state.review).filter(review => review.businessId === businessId))


    useEffect(async () => {
       await dispatch(getReviewsThunk(business.id))
    }, [dispatch])

    return (
        <>
        <h1>Reviews</h1>
        {reviews.map((review) =>{
            return(
                <>
                <h3>{review.content}</h3>
                <h3>Rating: {review.rating}</h3>
                <Editreview business={business} review={review}/>
                </>
            )
        })}
        </>
    )
}

export default BusinessReviews;
