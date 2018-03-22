import React from 'react';
import { connect, } from 'react-redux';
import { newCommentContent, clearCommentForm, } from '../store'

const CommentForm = props => {
    return (
        <div>
            <form onSubmit={props.handleCommentSubmit} >
                <input onChange={props.handleContentChange} type="text" name="content" value={props.newCommentContent} />
                <input type="submit" />
            </form>
        </div>
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
