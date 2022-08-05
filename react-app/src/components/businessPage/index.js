import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getAllBusinessThunk } from '../../store/business';
import EditBusiness from '../editBusiness/index'
import BusinessReviews from "../businessReviews";

import './businessPage.css';


function BusinessPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { id } = useParams();
    const url = window.location.href.split("/");
    const num = Number(url[url.length - 1]);
    // console.log("-----------", id)



    const user = useSelector((state) => state.session.user)
    const businesses = useSelector((state) => Object.values(state.business))
    const business = useSelector((state) => Object.values(state.business).find((business) => business?.id === num))
    // console.log(businesses)
    // console.log(user)
    // console.log("----------------------------",business)



    useEffect(() => {
        dispatch(getAllBusinessThunk())
    }, [dispatch])




    return (
        <>
            <div >
                <h1>Business</h1>
                    <>
                    {/* {businesses.map((business) =>{
                        return( */}
                        <>
                        <div class="business-container">
                            <h2> {business.name} </h2>
                            <h2> {business.address} </h2>
                            <h2> {business.city} </h2>
                            <h2> {business.state} </h2>
                            <h2> {business.phone_number} </h2>
                            <h2> {business.website} </h2>
                            <div>
                                <EditBusiness business={business}/>
                            </div>
                            <div>
                                <BusinessReviews business={business}/>
                            </div>
                            </div>
                        </>
                        {/* )
                    })} */}
                    </>
            </div>
        </>
        )
}
export default BusinessPage;
