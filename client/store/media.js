import Axios from 'axios';

//action type

const ADD_MEDIA_TO_STORY = 'ADD_MEDIA_TO_STORY';
const CLEAR_MEDIA_ON_STATE = 'CLEAR_MEDIA_ON_STATE';

//action creators
export const addMediaToStory = mediaObj => ({
  mediaObj,
  type: ADD_MEDIA_TO_STORY,
});
export const clearMediaOnState = () => ({
  type: CLEAR_MEDIA_ON_STATE,
});

//thunks
export const saveMediaToStory = (mediaArr, storyId, history) => dispatch => {
  Axios.post(`/api/media/${storyId}`)
    .then(res => res.data)
    .then(() => {
        dispatch(clearMediaOnState())
        history.push(`/story/${storyId}`)});
};

//initial state
const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MEDIA_TO_STORY:
      return [...state, action.mediaObj, ];
    case CLEAR_MEDIA_ON_STATE:
      return [];
    default:
      return state;
  }
}
