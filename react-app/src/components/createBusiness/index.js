import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createPostThunk } from "../../store/business";
import './createBusiness.css'

function CreateBusiness() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)
}
