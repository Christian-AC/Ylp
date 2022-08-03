import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getAllBusinessThunk } from '../../store/business';
import './businessPage.css';


function BusinessPage() {

    const { id } = useParams();

    const [business, setBusiness] = useState({});

    const user = useSelector((state) => state.session.user)


    //Gets the business related to the id in the
    useEffect(() => {
        if (!id) {
          return;
        }
        (async () => {
          const response = await fetch(`/api/business/${id}`);
          const business = await response.json();
          setBusiness(business);
        })();
      }, [id]);

    console.log("---------",business)
    // if (!business) {
    //     return <h1>Business doesn't exist</h1>
    //     }

    return (
        <>
            <div>
                <h1>Business</h1>
                  <h2> {business.name} </h2>
            </div>
        </>
        )
}
export default BusinessPage;
