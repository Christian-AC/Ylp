import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/review";
import  EditReviewModal  from "../editReview/editReviewModal"
import './businessReviews.css'



function BusinessReviews({business}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const businessId = business.id;

    const user = useSelector((state) => state.session.user)
    const reviews = useSelector((state) => Object.values(state.review).filter(review => review.businessId === businessId))
    const sortedReviews = reviews.sort().reverse()
    let rating = 0;
  const ratings = reviews.map((review) => review.rating);
  if (ratings.length) {
    ratings?.forEach((rate) => (rating = rate + rating));
    rating = rating / ratings.length;
  }

    useEffect(async () => {
       await dispatch(getReviewsThunk(business.id))
    }, [dispatch])

    return (
        <div className="review-container">
          <h1 className='review-title'>Reviews</h1>
          {sortedReviews.map((review) =>{
              return(
                  <>
                  <div className="single-review">
                    <h1>{review.reviewer}</h1>
                    <h3 className='review-rating'>{review.rating}/5  <img width ='15' src='https://www.seekpng.com/png/detail/77-776747_star-mario-star-png.png'/></h3>
                    {review.user.id === user.id ? (
                    <EditReviewModal business={business} review={review}/>):null}
                  </div>
                  <h3>{review.content}</h3>
                  </>
              )
          })}
        </div>
    )
}

export default BusinessReviews;
