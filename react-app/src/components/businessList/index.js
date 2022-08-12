import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getAllBusinessThunk } from '../../store/business';
import {AiFillPhone, AiOutlineCheck} from "react-icons/ai"
import EditBusiness from '../editBusiness/index'
import BusinessReviews from "../businessReviews";
import StarComponet from "./starcomponet";
import './businessList.css'


function BusinessList() {
    const dispatch = useDispatch();
    const history = useHistory();

    const url = window.location.href.split("/");
    const num = Number(url[url.length - 1]);



    const user = useSelector((state) => state.session.user)
    const businesses = useSelector((state) => Object.values(state.business))

    useEffect(() => {
        dispatch(getAllBusinessThunk())
    }, [dispatch])




    return (
        <div className="whole-container">
            <div>
                <h1 className='business-list-header'>Browsing Businesses:</h1>
            </div>
            <div className="business-list-container" >
                    <>
                    {businesses.map((business) =>{
                        return(
                            <div className='business-list'>
                                <div className='business-list-top'>
                                <img alt='business-logo-list' src={business.imageURL} className='business-logo-list'/>
                                    <div className='name-and-stars'>
                                        <NavLink className='link' to={`/business/${business.id}`}><h2 className='business-name'> {business.name} </h2></NavLink>
                                        <StarComponet business={business}/>
                                    </div>
                                </div>
                                <h3> {business.address} </h3>
                                <h3> {business.city}, {business.state} </h3>
                                <h3> <AiFillPhone/> {business.phone_number} </h3>
                                <h3> {business.website} </h3>
                            </div>
                         )
                    })}
                    </>
            </div>
        </div>
        )
}
export default BusinessList;
