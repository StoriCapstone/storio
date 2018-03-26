// import axios from 'axios';
// import {fetchSingleStory} from './stories'
// import {fetchSingleUser} from './users'
// import {fetchSingleGroup} from './groups'

// /* -----------------    ACTION TYPES    ------------------ */
// const GET_CURRENT = 'GET_CURRENT'

// export const setCurrent = (item,type) => dispatch => {
//   switch (type){
//     case 'story':
//     fetchSingleStory(item.id)
//     case 'member':
//     fetchSingleUser(item.id)
//     case 'group':
//     fetchSingleGroup(item.id)
//   }


// export default function reducer(state = {}, action) {
//   switch (action.type) {
//     case GET_CURRENT:
//       return action.stories;
//     case POST_NEW_STORY:
//       return [...state, action.story,]
//     case EDIT_STORY:
//       return state.map(story => {
//         if (STORY.id === action.story.id) {
//           return action.story
//         } else {
//           return story
//         }
//       })
//     case DELETE_STORY:
//       return state.filter(story => story.id !== action.id)
//     default:
//       return state;
//   }
// }
