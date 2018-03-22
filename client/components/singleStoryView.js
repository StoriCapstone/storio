import React from 'react';
import { connect, } from 'react-redux';
import MediaPlayer from './MediaPlayback/mediaPlayer'
import CommentForm from './commentForm'


const SingleComment = (props) => {
return (
    <div>
        <h4>{props.commentObj.user.displayName}</h4>
        <p>{props.commentObj.content}</p>
    </div>
)
}

const SingleStory = (props) => {
    return (
        <div>
            <MediaPlayer />
            <h2>Comments:</h2>
            {Object.keys(props.currentUser).length ? <CommentForm /> : <p>Sign in to leave comments</p>}
            {props.allComments.map(commentObj => <SingleComment key={commentObj.id} commentObj={commentObj} />)}
        </div>
    )
}
const mapState = (state) => ({
    currentUser: state.user,
});
const mapDispatch = null;
export default connect(mapState, mapDispatch)(SingleStory)
