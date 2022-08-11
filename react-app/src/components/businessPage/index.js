import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import {FaEdit} from "react-icons/fa"
import { getAllBusinessThunk } from '../../store/business';
import { getReviewsThunk } from "../../store/review";
import EditBusinessModal from '../editBusiness/editBusinessModal'
import BusinessReviews from "../businessReviews";
import CreateReviewModal from "../createReview/CreateReviewModal";

import './businessPage.css';


function BusinessPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isShown, setIsShown] = useState(false);



    const url = window.location.href.split("/");
    const num = Number(url[url.length - 1]);

    const user = useSelector((state) => state.session.user)
    const businesses = useSelector((state) => Object.values(state.business))
    const business = useSelector((state) => Object.values(state.business).find((business) => business?.id === num))
    const businessId = business.id;
    const userId = user.id

    const reviews = useSelector((state) => Object.values(state.review).filter(review => review.businessId === businessId))

    let rating = 0;
  const ratings = reviews?.map((review) => review.rating);
  if (ratings.length) {
    ratings?.forEach((rate) => (rating = rate + rating));
    rating = rating / ratings.length;
  }
    const handleClick = event => {
        setIsShown(current => !current);
      };

    useEffect(() => {
        dispatch(getReviewsThunk(business.id))
        dispatch(getAllBusinessThunk())
    }, [dispatch,num])

    return (
        <>
            <div >
                <h1>Business</h1>
                    <>
                        <>
                        <div class="business-container">
                            <h2> {business.name} </h2>
                            <h2> {business.address} </h2>
                            <h2> {business.city} </h2>
                            <h2> {business.state} </h2>
                            <h2> {business.phone_number} </h2>
                            <h2> {business.website} </h2>
                            <h2>AVG rating: {rating} </h2>
                            <h2># of reviews: {reviews.length}</h2>
                            {business.user.id === user.id ? (
                            <div>
                                <EditBusinessModal business={business}/>
                            </div>
                            ): null }
                            <div>
                                <CreateReviewModal business={business}/>
                            </div>
                            <div>
                                <BusinessReviews business={business}/>
                            </div>
                            </div>
                        </>
                    </>
            </div>
        </>
        )
}
export default BusinessPage;
