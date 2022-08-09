import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import {FaEdit} from "react-icons/fa"
import { getAllBusinessThunk } from '../../store/business';
import EditBusiness from '../editBusiness/index'
import BusinessReviews from "../businessReviews";
import CreateReview from "../createReview";

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

    const handleClick = event => {
        setIsShown(current => !current);
      };

    useEffect(() => {
        dispatch(getAllBusinessThunk())
    }, [dispatch])

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
                            <FaEdit size="22px" className="likebutton"  onClick={(e)=>handleClick(e)}/>
                            {isShown &&
                            <div>
                                <EditBusiness business={business}/>
                            </div>
                            }
                            <div>
                                <CreateReview business={business}/>
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
