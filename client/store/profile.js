import axios from 'axios';

//actions
const GET_PROFILE = 'GET_PROFILE';

const getProfile = (profile) => ({
    type: GET_PROFILE,
    profile,
})

export const getProfileThunk = (id) => dispatch => {
    axios.get(`/api/users/${id}`)
    .then(res => res.data)
    .then(info => dispatch(getProfile(info)))
}

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type){
        case GET_PROFILE:
            return action.profile
        default:
            return state
    }
}
