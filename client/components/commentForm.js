import React from 'react';
import { connect, } from 'react-redux';
import { newCommentContent, clearCommentForm, getNewCommentThunk, } from '../store'

const CommentForm = props => {
    return (
        <form onSubmit={(event) => props.handleCommentSubmit(event, props.story.id, props.user.id)} >
            <label>Add Comment</label>
            <p>{props.user.displayName}</p>
            <textarea onChange={props.handleContentChange} name="content" value={props.newCommentContent} />
            <br />
            <input type="submit" />
        </form>
    )
}
const mapState = (state) => ({
    newCommentContent: state.comments.content,
    user: state.user,
    story: state.story,
})

const mapDispatch = (dispatch) => ({
    handleCommentSubmit: (event, storyId, userId) => {
        event.preventDefault()
        dispatch(getNewCommentThunk({
            content: event.target.content.value,
            storyId,
            userId,
        }))
        dispatch(clearCommentForm())
    },
    handleContentChange: (event) => {
        dispatch(newCommentContent(event.target.value))
    },
})
export default connect(mapState, mapDispatch)(CommentForm)
