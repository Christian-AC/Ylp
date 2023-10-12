import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import {AiFillPhone, AiOutlineCheck} from "react-icons/ai"
import { getAllBusinessThunk } from '../../store/business';
import { getReviewsThunk } from "../../store/review";
import EditBusinessModal from '../editBusiness/editBusinessModal'
import BusinessReviews from "../businessReviews";
import CreateReviewModal from "../createReview/CreateReviewModal";
import MapPageA from "../googleMap";
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
    const key = 'AIzaSyCjY8yqiwTQ8cfdnduC2iB5WtlDEswe56s'

    const formatPhone = (number) => {
        return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    };

    const reviews = useSelector((state) => Object.values(state.review).filter(review => review.businessId === businessId))

    let rating = 0;
    const ratings = reviews?.map((review) => review.rating);
    if (ratings.length) {
        ratings?.forEach((rate) => (rating = rate + rating));
        rating = (rating / ratings.length).toFixed(1)
    }

    const handleClick = event => {
        setIsShown(current => !current);
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

    useEffect(() => {
        dispatch(getReviewsThunk(business.id))
        dispatch(getAllBusinessThunk())
    }, [dispatch,num])

    return (
        <>
            <div className="business-container">
                <div className='top-container'>
                    <img alt='business-logo' src={business.imageURL} className='business-logo' />
                    <div className="name-rating-container">
                        <h5 className="business-name-page"> {business.name} </h5>
                        <div className='rating-container'>
                        <img
							className="biz-star-rating"
							src={getRatingImg(rating)}
							/>
                            <h2 className='reviews'>{reviews.length} reviews</h2>
                        </div>
                    </div>
                </div>
                <div className='business-buttons'>
                    <div>
                        <CreateReviewModal business={business} />
                    </div>
                    {business.user.id === user.id ? (
                        <div>
                            <EditBusinessModal business={business} />
                        </div>
                    ) : null}
                </div>
                <div className="business-container-bottom">
                    <div className="business-page-left">
                        <div>
                            <div className='hours'>
                                <h2 className='titles'>Location and Hours</h2>
                                <div className='map-and-hours'>
                                    <iframe
                                        frameBorder="0"
                                        loading="lazy"
                                        className="google-map"
                                        title="location-map"
                                        src={`https://www.google.com/maps/embed/v1/place?key=${key}
                                                &q=${business["address"]},${business["city"]}+${business["state"]}`}
                                    ></iframe>
                                    <div className='time-container'>
                                        <h3 className='time'> Mon 11:00 AM - 9:00 PM</h3>
                                        <h3 className='time'> Tues 11:00 AM - 9:00 PM</h3>
                                        <h3 className='time'> Wed 11:00 AM - 9:00 PM</h3>
                                        <h3 className='time'> Thur 11:00 AM - 9:00 PM</h3>
                                        <h3 className='time'> Fri 11:00 AM - 9:00 PM</h3>
                                        <h3 className='time'> Sat 11:00 AM - 9:00 PM </h3>
                                        <h3 className='time'> Sun 11:00 AM - 9:00 PM</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='amenities'>
                                <h2 className='titles'>Amenities and More</h2>
                                <div className='Amenities-container'>
                                    <h3> <AiOutlineCheck /> Accepts Credit Cards</h3>
                                    <h3> <AiOutlineCheck /> Accepts Apple Pay</h3>
                                    <h3> <AiOutlineCheck /> Staff wears Masks</h3>
                                    <h3> <AiOutlineCheck />  Wifi</h3>
                                    <h3> <AiOutlineCheck /> Moderate Noise</h3>
                                    <h3> <AiOutlineCheck /> Good for Groups</h3>
                                </div>
                            </div>
                            <BusinessReviews business={business} />
                        </div>
                    </div>
                    <div className="business-page-right">
                        <h1>More Info</h1>
                        <div className="info">
                            <h2>Address</h2>
                            <h3> {business.address} </h3>
                        </div>
                        <div className="info">
                            <h2>Phone Number</h2>
                        </div>
                        <h3> <AiFillPhone /> {formatPhone(business.phone_number)} </h3>
                        <div className="info">
                            <h2>Website</h2>
                            <a href={business.website}>{business.website}</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
}
export default BusinessPage;
