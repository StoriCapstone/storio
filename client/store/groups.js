import axios from 'axios';
/* -----------------    ACTION TYPES    ------------------ */
const GET_ALL_GROUPS = 'GET_ALL_GROUPS';
const POST_NEW_GROUP = 'POST_NEW_GROUP';
const EDIT_GROUP = 'EDIT_GROUP';
const DELETE_GROUP = 'DELETE_GROUP';

/* ------------       ACTION CREATOR     ------------------ */
const getAllGroups = groups => ({
  type: GET_ALL_GROUPS, groups,
});

const editGroup = group => ({
  type: EDIT_GROUP, group,
});

const postNewGroup = group => ({
  type: POST_NEW_GROUP, group,
})

const deleteGroup = id => ({
  type: DELETE_GROUP, id,
})

/* ------------       THUNK CREATORS     ------------------ */

export const fetchAllGroups = () => dispatch => {
  axios.get('/api/groups')
    .then(res => dispatch(getAllGroups(res.data)))
    .catch(err => console.error(err));
}

export const postGroup = newGroup => dispatch => {
  axios.post('/api/groups', newGroup)
    .then(res => { return res.data })
    .then(addedGroup => dispatch(postNewGroup(addedGroup)))
    .catch(err => console.error(err));
}

export const editGroupThunk = (editedGroup, id) => dispatch => {
  axios.put(`/api/Groups/${id}`, editedGroup)
    .then(res => { return res.data })
    .then(changedGroup => dispatch(editGroup(changedGroup)))
    .catch(err => console.error(err));
}

export const deleteGroupThunk = (id) => dispatch => {
  axios.delete(`/api/Groups/${id}`)
    .then(res => res.data)
    .then(deleted => dispatch(deleteGroup(id)))
    .catch(err => console.error(err));
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_GROUPS:
      return action.groups;
    case POST_NEW_GROUP:
      return [...state, action.group, ]
    case EDIT_GROUP:
      return state.map(group => {
        if (GROUP.id === action.group.id) {
          return action.group
        } else {
          return group
        }
      })
    case DELETE_GROUP:
      return state.filter(group => group.id !== action.id)
    default:
      return state;
  }
}
