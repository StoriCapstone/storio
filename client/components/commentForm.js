import React from 'react';
import { connect, } from 'react-redux';
import { newCommentContent, clearCommentForm, } from '../store'

const CommentForm = props => {
    return (
        <form onSubmit={props.handleCommentSubmit} >
            <label>Add Comment</label>
            <textarea onChange={props.handleContentChange} name="content" value={props.newCommentContent} />
            <br />
            <input type="submit" />
        </form>
    )
}
const mapState = (state) => ({
    newCommentContent: state.comments.content,
})

const mapDispatch = (dispatch) => ({
    handleCommentSubmit: (event) => {
        event.preventDefault()
        dispatch(clearCommentForm())
    },
    handleContentChange: (event) => {
        dispatch(newCommentContent(event.target.value))
    },
})
export default connect(mapState, mapDispatch)(CommentForm)
