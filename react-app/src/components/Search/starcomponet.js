import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/review";


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

    useEffect(() => {
        dispatch(getReviewsThunk(business.id))
    }, [dispatch,num])

    return (
        <>
            {/* <div className='star-component'> */}
                <h3 className='rating'>{rating}<img width ='12' src='https://www.seekpng.com/png/detail/77-776747_star-mario-star-png.png'/></h3>
                {/* <h3 className='reviews-star'>{reviews.length} reviews</h3> */}
            {/* </div> */}
        </>
        )
}
export default StarComponet;
