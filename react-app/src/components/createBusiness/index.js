import { useState, useEffect } from "react";
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

    const [validationErrors, setValidationErrors] = useState([]);

    const updateName = (e) => setName(e.target.value)
    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updatePhoneNumber = (e) => setPhoneNumber(e.target.value)
    const updateWebsite = (e) => setWebsite(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Trying to submit business")

        const createdBusiness = {
            userId,
            name,
            address,
            city,
            state,
            phone_number,
            website,
        }
        // console.log(createdBusiness)
        let newBusiness = await dispatch(createBusinessThunk(createdBusiness))
            if(newBusiness) {
                // console.log("-----------",newBusiness)
                history.push(`/business/${newBusiness.id}`)
            }
    }

    useEffect(() => {
        const errors = [];

        if (name.length > 40)
          errors.push("Business name too long (40 characters or less)");

        if (address.length === 0) errors.push("Address can't be empty");

        if (city.length > 25)
          errors.push("City name too long (25 characters or less)");

        if (phone_number.length !== 10)
          errors.push("Phone number must be 10 digits");

        if (!website.includes("http://") && !website.includes("https://"))
          errors.push("Website must include http:// or https://");

        if (website.length > 52) errors.push("Website URL too long");

        setValidationErrors(errors);
      }, []);

      let requirements;

      if (validationErrors.length) {
        // requirements = (
        //         validationErrors.map(error =>{
        //             return(

        //                 <h2>{error}</h2>
        //             )
        //         }))
      } else {
        requirements = <></>;
      }

      return (<>
      <div>
      </div>
            <h2>Add your business!</h2>
            {requirements}
        <form className='business-form' onSubmit={handleSubmit}>
            <input type='text' value={name} placeholder='Business name' onChange={updateName}/>
            <input type='text' value={address} placeholder='address' onChange={updateAddress}/>
            <input type='text' value={city} placeholder='city' onChange={updateCity}/>
            <input type='text' value={state} placeholder='state' onChange={updateState}/>
            <input type='text' value={phone_number} placeholder='phone number' onChange={updatePhoneNumber}/>
            <input type='text' value={website} placeholder='website' onChange={updateWebsite}/>
            <button className="button" type="submit" onclick={handleSubmit}>Post</button>
        </form>
      </>

      )
}

export default CreateBusiness
