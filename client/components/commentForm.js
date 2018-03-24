import React from 'react';
import { connect, } from 'react-redux';
import { newCommentContent, clearCommentForm, getNewCommentThunk, } from '../store'

const CommentForm = props => {
    return (
        <form onSubmit={(event) => props.handleCommentSubmit(event, props.story.id, props.user.id, props.user )} >
            <label>Add Comment</label>
            <p>{props.user.displayName}</p>
            <textarea onChange={props.handleContentChange} name="content" value={props.newCommentContent} />
            <br />
            <input type="submit" />
        </form>
    )
}
const mapState = (state) => ({
    newCommentContent: state.commentForm.content,
    user: state.user,
    story: state.story,
})

const mapDispatch = (dispatch) => ({
    handleCommentSubmit: (event, storyId, userId, user) => {
        event.preventDefault()
        dispatch(getNewCommentThunk({
            content: event.target.content.value,
            storyId,
            userId,
            user,
        }))
        dispatch(clearCommentForm())
    },
    handleContentChange: (event) => {
        dispatch(newCommentContent(event.target.value))
    },
})
export default connect(mapState, mapDispatch)(CommentForm)
