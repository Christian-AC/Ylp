import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getAllBusinessThunk } from '../../store/business';
import {AiFillPhone} from "react-icons/ai"
import {FaDirections} from "react-icons/fa"
import StarComponet from "./starcomponet";



function SearchPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const url = window.location.href.split("/");
    const num = Number(url[url.length - 1]);
    const {searchValue} = useParams()

    const user = useSelector((state) => state.session.user)
    const businesses = useSelector((state) => Object.values(state.business))
    const searchBusinesses = businesses?.filter((business) => business.name.toUpperCase().includes(searchValue.toUpperCase()))
    // console.log("-----", searchRestaurantsArray)
    useEffect(() => {
        dispatch(getAllBusinessThunk())
    }, [dispatch])

    const formatPhone = (number) => {
        return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    };

    return (
        <>
        <h1 className='business-list-header'>{searchBusinesses?.length} {searchBusinesses?.length === 1 ? 'result' : 'results'} found for "{searchValue}"</h1>
            <div className="business-list-container" >
                    <>
                    {searchBusinesses.map((business) =>{
                        return(
                            <NavLink className='link' to={`/business/${business.id}`}>
                                <div className='business-list' >
                                    <img alt='business-logo-list' src={business.imageURL} className='business-logo-list'/>
                                    <div className='business-list-data'>
                                        <div className='name-and-stars'>
                                            <h2 className='business-name'> {business.name} </h2>
                                            <StarComponet business={business}/>
                                        </div>
                                        <div className='business-list-bottom'>
                                            <h2> <AiFillPhone/> {formatPhone(business.phone_number)} </h2>
                                            <h2> <FaDirections/> {business.address} {business.city}, {business.state} </h2>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        )
                    })}
                    </>
            </div>
        </>
        )
}
export default SearchPage;
