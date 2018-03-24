import Axios from 'axios';
import socket from '../socket';

//action type

const FETCH_STORY = 'FETCH_STORY';
const GET_NEW_COMMENT = 'GET_NEW_COMMENT';


//action creators

export const fetchStory = story => ({
    type: FETCH_STORY,
    story,
})

export const getNewComment = (comment) => ({
    type: GET_NEW_COMMENT,
    comment,
})

//initial state
let initialState = {}

//thunk creator
export const fetchStoryThunk = (storyId) => (dispatch) => {
    console.log(storyId)
    Axios.get(`/api/story/${storyId}`)
    .then(res => res.data)
    .then(storyObj => {
        dispatch(fetchStory(storyObj[0]))
    })
}

export const getNewCommentThunk = (comment) => (dispatch) => {
    dispatch(getNewComment(comment))
    Axios.post(`/api/story/${comment.storyId}`, comment)
    .then(res => res.data)
    .then(newComment => {
        socket.emit('new-comment', newComment)
    })
}

//reducer
export default function (state = initialState, action){
    switch (action.type){
        case FETCH_STORY:
            return {...action.story, }
        case GET_NEW_COMMENT:
            if (action.comment.storyId === state.id){
            return {...state, comments: [...state.comments, {...action.comment, user: {...action.comment.user, }, }, ], }
        }
        else {
            return {...state, }
        }
        default:
            return state
    }
}
