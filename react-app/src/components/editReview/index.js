import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReviewsThunk, deleteReviewsThunk, updateReviewThunk } from "../../store/review"


function Editreview ({review}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user)


    return(
        <>
        <h1>Hey</h1>
        </>
    )
}

export default Editreview
