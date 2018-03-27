import axios from 'axios';

const GET_RATING = 'GET_RATING';

const INCREASE_RATING = 'INCREASE_RATING';

const DECREASE_RATING = 'DECREASE_RATING';

const REMOVE_VOTE = 'REMOVE_VOTE';

export const increaseRating = () => ({
    type: INCREASE_RATING,
})

export const decreaseRating = () => ({
    type: DECREASE_RATING,
})

export const getRating = rating => ({
    type: GET_RATING,
    rating,
})

export const removeVote = () => ({
    type: REMOVE_VOTE,
})

const initialState = {
    voted: false,
    vote: null,
    rating: 0,
}

export default function(state = initialState, action){
    switch (action.type){
        case GET_RATING:
            return {...state, rating: action.rating, }
        case INCREASE_RATING:
            return {...state, rating: ++state.rating, voted: true, vote: 'up', }
        case DECREASE_RATING:
            return {...state, rating: --state.rating, voted: true, vote: 'down', }
        case REMOVE_VOTE:
        if (state.vote === 'up'){
            return {...state, voted: false, vote: null, rating: --state.rating, }
        } else {
            return {...state, voted: false, vote: null, rating: ++state.rating, }
        }
        default:
            return state
    }
}

