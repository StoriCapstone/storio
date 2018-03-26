import Axios from 'axios';
import { Storage, } from 'aws-amplify';
//action type

const ADD_MEDIA_TO_STORY = 'ADD_MEDIA_TO_STORY';
const CLEAR_MEDIA_ON_STATE = 'CLEAR_MEDIA_ON_STATE';
const DELETE_MEDIA_FROM_STORY = 'DELETE_MEDIA_FROM_STORY';

//action creators
export const addMediaToStory = mediaObj => ({
  mediaObj,
  type: ADD_MEDIA_TO_STORY,
});
export const clearMediaOnState = () => ({
  type: CLEAR_MEDIA_ON_STATE,
});

export const deleteMediaFromStory = (key) => ({
  key,
  type: DELETE_MEDIA_FROM_STORY,
})

//thunks
export const saveMediaToStory = (mediaArr, storyId, history) => dispatch => {
  Axios.post(`/api/media/${storyId}`, mediaArr)
    .then(res => res.data)
    .then(() => {
        dispatch(clearMediaOnState())
        history.push(`/singleStory/${storyId}`)});
};

export const deleteMediaFromStoryThunk = key => dispatch => {
  Storage.remove(key).then(
    () => dispatch(deleteMediaFromStory(key))
  )
}

//initial state
const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MEDIA_TO_STORY:
      return [...state, action.mediaObj, ];
    case CLEAR_MEDIA_ON_STATE:
      return [];
    case DELETE_MEDIA_FROM_STORY:
      return state.filter(media => media.key !== action.key);
    default:
      return state;
  }
}
