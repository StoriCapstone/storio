import Axios from 'axios';
import socket from '../socket';

//action type

const NEW_COMMENT_CONTENT = 'NEW_COMMENT_CONTENT';
const CLEAR_COMMENT_FORM = 'CLEAR_COMMENT_FORM';
const GET_COMMENTS = 'GET_COMMENTS';
const GET_NEW_COMMENT = 'GET_NEW_COMMENT';

//action creators

export const newCommentContent = content => ({
    type: NEW_COMMENT_CONTENT,
    content,
})

export const clearCommentForm = () => ({
    type: CLEAR_COMMENT_FORM,
})

export const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments,
})

export const getNewComment = (comment) => ({
    type: GET_NEW_COMMENT,
    comment,
})
//thunk
export const getNewCommentThunk = (comment) => (dispatch) => {
    Axios.post(`/story/${comment.storyId}`, comment)
    .then(newComment => {
        dispatch(getNewComment(newComment))
        socket.emit('new-comment', newComment)
    })
}

//initial state
let initialState = {
    content: '',
    comments: [],
}

//reducer
export default function (state = initialState, action){
    switch (action.type){
        case NEW_COMMENT_CONTENT:
            return {...state, content: action.content, }
        case CLEAR_COMMENT_FORM:
            return {...state, content: '', }
        case GET_COMMENTS:
            return {...state, comments: [...action.comments, ], }
        case GET_NEW_COMMENT:
            return {...state, comments: [...state.comments, action.comment, ], }
        default:
            return state
    }
}
