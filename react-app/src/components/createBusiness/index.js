import { useState, useEffect } from "react";
import { useHistory,Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createBusinessThunk } from "../../store/business";
import './createBusiness.css'

function CreateBusiness({setShowModal}) {
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
    const [zipCode, setZipcode] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");
    const [imageURL, setimageURL] = useState("");

    const updateName = (e) => setName(e.target.value)
    const updateAddress = (e) => setAddress(e.target.value)
    const updateZipcode = (e) => setZipcode(e.target.value)
    const updatePhoneNumber = (e) => setPhoneNumber(e.target.value)
    const updateWebsite = (e) => setWebsite(e.target.value)
    const updateImageURL = (e) => setimageURL(e.target.value)


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
      } else if (phone_number === '') {
        errorsObj.phone_number = "Phone # is required"
        error = true;
      }else if (phone_number.length !== 10 ) {
        errorsObj.phone_number ="Valid 10 digit phone number is required"
        error = true;
      }else if(!website.includes('www.')) {
        errorsObj.website = "Please enter a valid website starting with 'www.'"
        error = true;
      }else if (!imageURL.includes(".jpg") && !imageURL.includes(".png") && !imageURL.includes(".JPG") && !imageURL.includes(".PNG") && !imageURL.includes(".JPEG") && !imageURL.includes(".jpeg")) {
        errorsObj.imageURL = "Logo image must be a URL a containing jpg/png/jpeg file extension"
        error = true
      }
      else if (imageURL.length < 4) {
        errorsObj.imageURL = "Logo image must be at least 4 characters."
        error = true
      }

      setErrors(errorsObj);

      if(!error) {
        const createdBusiness = {
            userId,
            name,
            address,
            zipCode,
            phone_number,
            website,
            imageURL
        }
        let newBusiness = await dispatch(createBusinessThunk(createdBusiness))
        history.push(`/business/${newBusiness.id}`)
        setShowModal(false)
      }
    }

      return (
        <>
          <div className='login-form-container'>
          <h2 className='loginform-text-intro'>Add your business!</h2>
          <form className="loginform-form" onSubmit={handleSubmit}>
            {Object.values(errors).map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
            <div className='create-div'>
              <input className='loginform-inputs' type='text' value={name} placeholder='Business name' onChange={updateName} required />
            </div>
            <div className='create-div'>
              <input className='loginform-inputs' type='text' value={address} placeholder='Address' onChange={updateAddress} required />
            </div>
            <div className='create-div'>
              <input className='loginform-inputs' type='text' value={zipCode} placeholder='Zip Code' onChange={updateZipcode} required />
            </div>
            <div className='create-div'>
              <input className='loginform-inputs' type='text' value={phone_number} placeholder='Phone #' onChange={updatePhoneNumber} required />
            </div>
            <div className='create-div'>
              <input className='loginform-inputs' type='text' value={website} placeholder='URL' onChange={updateWebsite} required />
            </div>
            <div className='create-div'>
              <input className='loginform-inputs' type='text' value={imageURL} placeholder='Logo Image URL' onChange={updateImageURL} required />
            </div>
            <button className="signup-bottons" type="submit">Post</button>
          </form>
          </div>
        </>

      )
}

export default CreateBusiness
