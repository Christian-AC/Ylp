import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getAllBusinessThunk } from '../../store/business';
import EditBusiness from '../editBusiness/index'
import BusinessReviews from "../businessReviews";




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
        <>
            <div >
                <h1>businesses:</h1>
                    <>
                    {businesses.map((business) =>{
                        return(
                        <>
                        <div>
                            <NavLink to={`/business/${business.id}`}><h3> {business.name} </h3></NavLink>
                        </div>
                        </>
                         )
                    })}
                    </>
            </div>
        </>
        )
}
export default BusinessList;
