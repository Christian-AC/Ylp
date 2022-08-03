import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createBusinessThunk } from "../../store/business";
import './createBusiness.css'

function CreateBusiness() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)

    const [userId] = useState((user.id));
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");

    const updateName = (e) => setName(e.target.value)
    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updatePhoneNumber = (e) => setPhoneNumber(e.target.value)
    const updateWebsite = (e) => setWebsite(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Trying to submit business")

        const createdBusiness = {
            userId,
            name,
            address,
            city,
            state,
            phone_number,
            website,
        }
        console.log(createdBusiness)

        let newBusiness = await dispatch(createBusinessThunk(createdBusiness))
            if(newBusiness) {
                history.push(`/`)
            }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push("/");
      };

      return (
        <form className='business-form' onSubmit={handleSubmit}>
            <h2>Add your business!</h2>
            <input type='text' value={name} placeholder='Business name' onChange={updateName}/>
            <input type='text' value={address} placeholder='address' onChange={updateAddress}/>
            <input type='text' value={city} placeholder='city' onChange={updateCity}/>
            <input type='text' value={state} placeholder='state' onChange={updateState}/>
            <input type='text' value={phone_number} placeholder='phone number' onChange={updatePhoneNumber}/>
            <input type='text' value={website} placeholder='website' onChange={updateWebsite}/>
            <button className="button" type="submit" onclick={handleSubmit}>Post</button>
        </form>

      )
}

export default CreateBusiness
