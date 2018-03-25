//action type

const ADD_MEDIA_TO_STORY = 'ADD_MEDIA_TO_STORY';

//action creators
export const addMediaToStory = (mediaObj) => ({
    mediaObj,
    type: ADD_MEDIA_TO_STORY,
})

//initial state
const initialState = [];

export default function( state = initialState, action){
    switch (action.type){
        case ADD_MEDIA_TO_STORY:
            return [...state, action.mediaObj, ]
        default:
            return state
    }
}
