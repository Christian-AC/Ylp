import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/review";
import  EditReviewModal  from "../editReview/editReviewModal"
import './businessReviews.css'
import zeroStars from "../assets/0-stars.png";
import oneStars from "../assets/1-stars.png";
import twoStars from "../assets/2-stars.png";
import threeStars from "../assets/3-stars.png";
import fourStars from "../assets/4-stars.png";
import fiveStars from "../assets/5-stars.png";
import oneandOneHalfStars from "../assets/1.5-stars.png";
import twoandOneHalfStars from "../assets/2.5-stars.png";
import threeandOneHalfStars from "../assets/3.5-stars.png";
import fourandOneHalfStars from "../assets/4.5-stars.png";



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
      rating = (rating / ratings.length).toFixed(1);
    }

    function addHours(numOfHours, date = new Date()) {
      date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

      return date;
    }
    const convertDate = (createdAt) => {
      const d = new Date(createdAt);
      const addtime = addHours(0, d);
      const now = Date.now();

      const hourDiff = Math.floor((now - addtime) / 1000 / 60 / 60);
      if (hourDiff < 1) {
        return Math.floor((now - addtime) / 1000 / 60) + " mins ago";
      }
      if (hourDiff < 24) {
        return Math.floor((now - addtime) / 1000 / 60 / 60) + " hrs ago";
      }
      if (hourDiff >= 24) {
        return Math.floor((now - addtime) / 1000 / 60 / 60 / 24) + " days ago";
      }
    };

    const getRatingImg = (rating) => {
      if (!rating) {
        return zeroStars;
      } else if (rating > 0 && rating <= 1) {
        return oneStars;
      } else if (rating > 1 && rating <= 1.5) {
        return oneandOneHalfStars;
      } else if (rating > 1.5 && rating <= 2) {
        return twoStars;
      } else if (rating > 2 && rating <= 2.5) {
        return twoandOneHalfStars;
      } else if (rating > 2.5 && rating <= 3) {
        return threeStars;
      } else if (rating > 3 && rating <= 3.5) {
        return threeandOneHalfStars;
      } else if (rating > 3.5 && rating <= 4) {
        return fourStars;
      } else if (rating > 4 && rating <= 4.5) {
        return fourandOneHalfStars;
      } else if (rating > 4.5 && rating <= 5) {
        return fiveStars;
      }
    };

    useEffect(async () => {
       await dispatch(getReviewsThunk(business.id))
    }, [dispatch])

  return (
    <div className="review-container">
      <h1 className='review-title'>Reviews</h1>
      {sortedReviews.map((review) => {
        return (
          <>
            <div className="single-review">
              <div className="review-top">
                <h1 className="reviewer">{review.reviewer}</h1>
                {review.user.id === user.id ? (
                  <EditReviewModal business={business} review={review} />) : null}
              </div>
              <div className="rating-time-container">
                <img
                  className="star-review-page"
                  src={getRatingImg(review.rating)}
                />
                <h2 className="rating-time">{convertDate(review.created_at)}</h2>
              </div>
              <h3 className="content">{review.content}</h3>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default BusinessReviews;
