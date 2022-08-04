import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getAllBusinessThunk, deleteBusinessThunk } from '../../store/business';
import EditBusiness from '../editBusiness/index'
import './businessPage.css';


function BusinessPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();


    const user = useSelector((state) => state.session.user)
    const businesses = useSelector((state) => Object.values(state.business))
    const business = businesses.find((business) => business?.id === +id)
    // console.log(businesses)
    // console.log(user)
    console.log("!!!!!!!!!",businesses)



    useEffect(() => {
        dispatch(getAllBusinessThunk())
    }, [dispatch])

    const handleDeleteClick = async(e) => {
        e.preventDefault()
        await dispatch(deleteBusinessThunk(id));
        alert("Business Deleted successfully")
        history.push('/')
    }



    return (
        <>
            <div>
                <h1>Business</h1>
                    <>
                        <h2> {business.name} </h2>
                        <h2> {business.address} </h2>
                        <h2> {business.city} </h2>
                        <h2> {business.state} </h2>
                        <h2> {business.phone_number} </h2>
                        <h2> {business.website} </h2>
                        <button onClick={(e)=>handleDeleteClick(e)}>Delete</button>
                        <div>
                            <EditBusiness business={business}/>
                        </div>
                    </>
            </div>
        </>
        )
}
export default BusinessPage;

