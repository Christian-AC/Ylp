import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/review";
import './businessList.css'
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

function StarComponet({business}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const url = window.location.href.split("/");
    const num = Number(url[url.length - 1]);

    const user = useSelector((state) => state.session.user)
    const businessId = business.id;
    const userId = user.id

    const reviews = useSelector((state) => Object.values(state.review).filter(review => review.businessId === businessId))

    let rating = 0;
    const ratings = reviews?.map((review) => review.rating);
    if (ratings.length) {
        ratings?.forEach((rate) => (rating = rate + rating));
        rating = (rating / ratings.length).toFixed(1)
    }

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

    useEffect(() => {
        dispatch(getReviewsThunk(business.id))
    }, [dispatch,num])

    return (
        <>

            <img
                className="biz-star-rating"
                src={getRatingImg(rating)}
            />

        </>
        )
}
export default StarComponet;
