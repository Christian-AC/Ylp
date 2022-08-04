import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllBusinessThunk, updateBusinessThunk, deleteBusinessThunk } from "../../store/business";


function EditBusiness ({business}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)
    // console.log(name)



    const [userId] = useState((user.id));
    const [name, setName] = useState(business.name);
    const [address, setAddress] = useState(business.address);
    const [city, setCity] = useState(business.city);
    const [state, setState] = useState(business.state);
    const [phone_number, setPhoneNumber] = useState(business.phone_number);
    const [website, setWebsite] = useState(business.website);

    const updateName = (e) => setName(e.target.value)
    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updatePhoneNumber = (e) => setPhoneNumber(e.target.value)
    const updateWebsite = (e) => setWebsite(e.target.value)
    // console.log(name)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateBusiness = {
            userId,
            name,
            address,
            city,
            state,
            phone_number,
            website,
        }
        // console.log(createdBusiness)
        dispatch(updateBusinessThunk(updateBusiness, business.id))
        dispatch(getAllBusinessThunk())
        history.push(`/business/${business.id}`)

    }
    const handleDeleteClick = async(e) => {
        e.preventDefault()
        await dispatch(deleteBusinessThunk(business.id));
        dispatch(getAllBusinessThunk())
        alert("Business Deleted successfully")
        // history.push('/')
    }



    return (
        <>
        <button onClick={(e)=>handleDeleteClick(e)}>Delete</button>
        <form className='business-form' onSubmit={handleSubmit}>
            <h2>Edit your business!</h2>
            <input type='text' value={name} placeholder='Business name' onChange={updateName}/>
            <input type='text' value={address} placeholder='address' onChange={updateAddress}/>
            <input type='text' value={city} placeholder='city' onChange={updateCity}/>
            <input type='text' value={state} placeholder='state' onChange={updateState}/>
            <input type='text' value={phone_number} placeholder='phone number' onChange={updatePhoneNumber}/>
            <input type='text' value={website} placeholder='website' onChange={updateWebsite}/>
            <button className="button" type="submit">Post</button>
        </form>
        </>
    )
}

export default EditBusiness
