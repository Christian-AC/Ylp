import { useState, useEffect } from "react";
import { useHistory,Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createBusinessThunk } from "../../store/business";
import './createBusiness.css'

function CreateBusiness() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)
    const business = useSelector(state => state.businesses)
    // console.log("------",business)
    let errorsObj = {content: ''};

    const [userId] = useState((user.id));
    const [errors, setErrors] = useState(errorsObj);
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

      let error = false;
      errorsObj = {...errorsObj};
      if(name === '') {
        errorsObj.name = "Name is required";
        error = true;
      } else if (name.length < 4 || name.length > 20) {
        errorsObj.name = "Name must be longer than 4 characters and shorter than 20";
        error = true;
      } else if (address.length < 4 || address.length > 25) {
        errorsObj.address = "Address must be longer than 4 characters and shorter than 25";
        error = true;
      } else if (city === '') {
        errorsObj.city = "City is required"
        error = true;
      }else if (state === '') {
        errorsObj.state = "State is required"
        error = true;
      }else if (phone_number === '') {
        errorsObj.phone_number = "Phone # is required"
        error = true;
      }else if (phone_number.length !== 10 ) {
        errorsObj.phone_number ="Valid 10 digit phone number is required"
        error = true;
      }else if(!website.includes('www')) {
        errorsObj.website = "Please enter a valid website starting with 'www'"
        error = true;
      }
      setErrors(errorsObj);

      if(!error) {
        const createdBusiness = {
            userId,
            name,
            address,
            city,
            state,
            phone_number,
            website,
        }
        let newBusiness = await dispatch(createBusinessThunk(createdBusiness))
        history.push(`/business/${newBusiness.id}`)
      }
    }

      return (<>
      <div>
      </div>
            <h2>Add your business!</h2>
        <form className='business-form' onSubmit={handleSubmit}>
          {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
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

export default CreateBusiness
