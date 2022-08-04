const GET_ALL_BUSINESSES = 'business/GET_ALL_BUSINESSES'
const CREATE_BUSINESS = 'business/CREATE_BUSINESS'
const DELETE_BUSINESS = 'business/DELETE_BUSINESS'
const UPDATE_BUSINESS = 'business/UPDATE_BUSINESS'

const getAllBusiness = (businesses) => ({
    type: GET_ALL_BUSINESSES,
    businesses
})

const createBusiness = (business) => ({
    type: CREATE_BUSINESS,
    business
})

const deleteBusiness = (business) => ({
    type: DELETE_BUSINESS,
    business
})

const updateBusiness = (business) => ({
    type: UPDATE_BUSINESS,
    business
})

export const getAllBusinessThunk = () => async(dispatch) => {
    const response = await fetch('/api/business')
    const data = await response.json();
    dispatch(getAllBusiness(data.businesses))
    return data.businesses
}

export const createBusinessThunk = (business) => async(dispatch) => {
    const response = await fetch('/api/business/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(business),
    });
    if (response.ok) {
      const business = await response.json();
      dispatch(createBusiness(business));
      return business;
    }
};

export const deleteBusinessThunk = (id) => async(dispatch) => {
    const response = await fetch(`/api/business/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      const data = await response.json()
      dispatch(deleteBusiness(data))
    }
  }

export const updateBusinessThunk = (business, id) => async(dispatch) => {
const response = await fetch(`/api/business/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(business),
    });
    if (response.ok) {
    const post = await response.json();
    dispatch(updateBusiness(business));
    return business;
    }
}


const initialState = {};

export const businessReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_ALL_BUSINESSES:
            action.businesses.forEach((business) => {
                return newState[business.id] = business;
            })
            return newState
        case CREATE_BUSINESS:
            if (!state[action.business.id]) {
                newState = {
                    ...state,
                    [action.business.id]: action.business,
                };
            }
            return newState;
        case UPDATE_BUSINESS:
            newState = {...state, [action.business.id]: action.business}
        case DELETE_BUSINESS:
            delete newState[action.business.id]
            return newState
        default:
            return state
    }
}
