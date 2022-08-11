import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import {AiFillPhone, AiOutlineCheck} from "react-icons/ai"
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
                <>
                <div className="business-container">
                    <div className='top-container'>
                    <h1> {business.name} </h1>
                    <div className='rating-container'>
                        <h2 className='rating'>{rating}/5  <img width ='15' src='https://www.seekpng.com/png/detail/77-776747_star-mario-star-png.png'/></h2>
                        <h2>{reviews.length} reviews</h2>
                    </div>
                    </div>
                    <div className='business-buttons'>
                        <div>
                            <CreateReviewModal business={business}/>
                        </div>
                        {business.user.id === user.id ? (
                            <div>
                            <EditBusinessModal business={business}/>
                            </div>
                        ): null }
                    </div>
                    <div className="business-page-bottom">
                        <div>
                            <div className='amenities'>
                                <h2>Amenities and More</h2>
                                <div className='Amenities-container'>
                                    <h3> <AiOutlineCheck/> Accepts Credit Cards</h3>
                                    <h3> <AiOutlineCheck/> Accepts Apple Pay</h3>
                                    <h3> <AiOutlineCheck/> Staff wears Masks</h3>
                                    <h3> <AiOutlineCheck/>  Wifi</h3>
                                    <h3> <AiOutlineCheck/> Moderate Noise</h3>
                                    <h3> <AiOutlineCheck/> Good for Groups</h3>
                                </div>
                            </div>
                            <BusinessReviews business={business}/>
                        </div>
                        <div className="info-container">
                            <h2>More Info</h2>
                            <h3> {business.address} </h3>
                            <h3> {business.city}, {business.state} </h3>
                            <h3> <AiFillPhone/> {business.phone_number} </h3>
                            <h3> {business.website} </h3>
                        </div>
                        </div>
                    </div>
                </>

            </div>
        </>
        )
}
export default BusinessPage;
