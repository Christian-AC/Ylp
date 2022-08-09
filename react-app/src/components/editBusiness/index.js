import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllBusinessThunk, updateBusinessThunk, deleteBusinessThunk } from "../../store/business";
import EditBusinessModal from "./editBusinessModal";


function EditBusiness ({business, setShowModal}) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [showModal, setShowModal] = useState(false);
    const showModal = EditBusinessModal.showModal
    const user = useSelector(state => state.session.user)
    // console.log(name)

    const [userId] = useState((user.id));
    const [name, setName] = useState(business.name);
    const [address, setAddress] = useState(business.address);
    const [city, setCity] = useState(business.city);
    const [state, setState] = useState(business.state);
    const [phone_number, setPhoneNumber] = useState(business.phone_number);
    const [website, setWebsite] = useState(business.website);

    const [validationErrors, setValidationErrors] = useState([]);

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

        await dispatch(updateBusinessThunk(updateBusiness, business.id))
        await dispatch(getAllBusinessThunk())
        // alert("Business Updated")
        // history.push(`/business/${business.id}`)
        setShowModal(false)
    }
    const handleDeleteClick = async (e) => {
        e.preventDefault()
        dispatch(deleteBusinessThunk(business.id));
        alert("Business Deleted successfully")
        history.push(`/business`)

    }

    let requirements;

      if (validationErrors.length) {
        requirements = (
                validationErrors.map(error =>{
                    return(
                        <h3>{error}</h3>
                    )
                }))
      } else {
        requirements = <></>;
      }



    return (
        <>
        <form className='business-form' onSubmit={handleSubmit}>
            <h2>Edit your business!</h2>
            {requirements}
            <input type='text' value={name} placeholder='Business name' onChange={updateName} required/>
            <input type='text' value={address} placeholder='address' onChange={updateAddress} required/>
            <input type='text' value={city} placeholder='city' onChange={updateCity} required/>
            <input type='text' value={state} placeholder='state' onChange={updateState} required/>
            <input type='text' value={phone_number} placeholder='phone number' onChange={updatePhoneNumber}/>
            <input type='text' value={website} placeholder='website' onChange={updateWebsite}/>
            <button className="button" type="submit" onSubmit={() => showModal(false)}>Post</button>
        </form>
        <button onClick={(e)=>handleDeleteClick(e)}>Delete</button>
        </>
    )
}

export default EditBusiness
