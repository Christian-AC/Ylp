const GET_REVIEWS = 'review/GET_REVIEWS'
const CREATE_REVIEW = 'review/CREATE_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'
const UPDATE_REVIEW = 'review/UPDATE_REVIEW'

const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
})

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})

export const getReviewsThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`)
    const data = await response.json()
    dispatch(getReviews(data.reviews))
    return data.reviews
}

export const createReviewThunk = (review) => async (dispatch) => {
    const response = await fetch('/api/reviews/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    });
    if(response.ok) {
        const business = await response.json();
        dispatch(createReview(business));
        return business;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

export const deleteReviewThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteReview(data))
    }
}

export const updateReviewThunk = (review, id) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    })
    if(response.ok){
        const data = await response.json()
        dispatch(updateReview(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    } else {
        return ['An error occurred. Please try again.']
    }
}

const initialState = {};

export const reviewReducer = (state = initialState, action) => {
    let newState = JSON.parse(JSON.stringify(state));

    switch(action.type) {
        case GET_REVIEWS:
            action.reviews.forEach((review) => {
                return newState[review.id] = review;
            })
            return newState;
        case CREATE_REVIEW:
            if(!state[action.review.id]) {
                newState = {
                    ...state,
                    [action.review.id]: action.review
                };
            }
            return newState;
        case UPDATE_REVIEW:
            newState = {...state, [action.review.id]: action.review}
        case DELETE_REVIEW:
            delete newState[action.review.id];
            return newState;
        default:
            return state
    }
}
