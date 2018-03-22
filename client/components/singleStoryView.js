import React from 'react';
import { connect, } from 'react-redux';
import MediaPlayer from './MediaPlayback/mediaPlayer'
import CommentForm from './commentForm'


const SingleStory = (props) => {
    return (
        <div>
            <MediaPlayer />
            <h2>Comments:</h2>
            {Object.keys(props.currentUser).length ? <CommentForm /> : <p>Sign in to leave comments</p>}
        </div>
    )
}
const mapState = (state) => ({
    currentUser: state.user,
});
const mapProps = null;
export default connect(mapState, mapProps)(SingleStory)
