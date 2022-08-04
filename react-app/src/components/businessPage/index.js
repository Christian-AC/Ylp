import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getAllBusinessThunk } from '../../store/business';
import EditBusiness from '../editBusiness/index'
import './businessPage.css';


function BusinessPage() {
    const dispatch = useDispatch();
    const history = useHistory();


    const user = useSelector((state) => state.session.user)
    const businesses = useSelector((state) => Object.values(state.business))
    // const business = businesses.find((business) => business?.id === +id)
    // console.log(businesses)
    // console.log(user)
    console.log("!!!!!!!!!",businesses)



    useEffect(() => {
        dispatch(getAllBusinessThunk())
    }, [dispatch])




    return (
        <>
            <div>
                <h1>Business</h1>
                    <>
                    {businesses.map((business) =>{
                        return(
                        <>
                            <NavLink to={`/business/${business.id}`}> <h1>{business.name} </h1></NavLink>
                            <h2> {business.address} </h2>
                            <h2> {business.city} </h2>
                            <h2> {business.state} </h2>
                            <h2> {business.phone_number} </h2>
                            <h2> {business.website} </h2>

                            <div>
                                <EditBusiness business={business}/>
                            </div>
                        </>
                        )
                    })}
                    </>
            </div>
        </>
        )
}
export default BusinessPage;
