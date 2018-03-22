import Axios from 'axios';

//action type

const FETCH_STORY = 'FETCH_STORY';


//action creators

export const fetchStory = story => ({
    type: FETCH_STORY,
    story,
})


//initial state
let initialState = {}

//thunk creator
export const fetchStoryThunk = (storyId) => (dispatch) => {
    Axios.get(`/story/${storyId}`)
    .then(storyObj => {
        dispatch(fetchStory(storyObj))
    })
}

//reducer
export default function (state = initialState, action){
    switch (action.type){
        case FETCH_STORY:
            return {...state, story: action.story, }
        default:
            return state
    }
}
