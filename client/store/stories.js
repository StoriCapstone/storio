import axios from 'axios';
/* -----------------    ACTION TYPES    ------------------ */
const GET_ALL_STORIES = 'GET_ALL_STORIES';
const POST_NEW_STORY = 'POST_NEW_STORY';
const EDIT_STORY = 'EDIT_STORY';
const DELETE_STORY = 'DELETE_STORY';
const SET_CURRENT_STORY = 'SET_CURRENT_STORY'

/* ------------       ACTION CREATOR     ------------------ */
const getAllStories = stories => ({
  type: GET_ALL_STORIES, stories,
});

const editStory = story => ({
  type: EDIT_STORY, story,
});

const postNewStory = story => ({
  type: POST_NEW_STORY, story,
})

const deleteStory = id => ({
  type: DELETE_STORY, id,
})

const setCurrent = story => ({
  type: SET_CURRENT_STORY, story
})

/* ------------       THUNK CREATORS     ------------------ */
// export const fetchSingleStory = (id) => dispatch => {
//   console.log('firibng')
//   axios.get(`/api/stories/${id}`)
//     .then(res => {
//       console.log('HERE IT IS', res.data)
//       dispatch(editStory(res.data)) //call editStory in order to update the target story in the store
//       dispatch(setCurrent(res.data)) //return the target story
//     })
//     .catch(err => console.error(err));

// }

export const fetchAllStories = () => dispatch => {
  axios.get('/api/stories')
    .then(res => dispatch(getAllStories(res.data)))
    .catch(err => console.error(err));
}

export const postStory = (newStory, cb) => dispatch => {
  axios.post('/api/stories', newStory)
    .then(res => {
      dispatch(postNewStory(res))
      if (cb) {
        dispatch(() => cb(res.data))
      }
      return res.data
    })
    // .then(addedStory => ))
    .catch(err => console.error(err));
}

export const editStoryThunk = (editedStory, id) => dispatch => {
  axios.put(`/api/Stories/${id}`, editedStory)
    .then(res => { return res.data })
    .then(changedStory => dispatch(editStory(changedStory)))
    .catch(err => console.error(err));
}

export const deleteStoryThunk = (id) => dispatch => {
  axios.delete(`/api/Stories/${id}`)
    .then(res => res.data)
    .then(deleted => dispatch(deleteStory(id)))
    .catch(err => console.error(err));
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_STORIES:
      return action.stories;
    case POST_NEW_STORY:
      return [...state, action.story,]
    case EDIT_STORY:
      return state.map(story => {
        if (story.id === action.story.id) {
          return action.story
        } else {
          return story
        }
      })
    case DELETE_STORY:
      return state.filter(story => story.id !== action.id)
    case SET_CURRENT_STORY:
    let mod = [ ...state]
    mod.current = action.story //return the existing state array + property of current with selected item
      return mod
    default:
      return state;
  }
}
