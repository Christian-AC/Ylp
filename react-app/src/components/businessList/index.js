import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getAllBusinessThunk } from '../../store/business';
import StarComponet from "./starcomponet";
import './businessList.css'


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

    const formatPhone = (number) => {
        return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    };

    return (
        <>
            <h1 className='business-list-header'>Your Next Review Awaits</h1>
            <div className="business-list-container" >
                <>
                    {businesses.map((business) => {
                        return (
                            <NavLink className='link' to={`/business/${business.id}`}>
                                <div className='business-list' >
                                    <img alt='business-logo-list' src={business.imageURL} className='business-logo-list' />
                                    <div className='business-list-data'>
                                        <h2 className='business-name'> {business.name} </h2>
                                        <h2 className="address"> {business.address} </h2>
                                        <StarComponet business={business} />
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
export default BusinessList;
