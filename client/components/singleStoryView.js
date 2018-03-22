import React from 'react';
import { connect, } from 'react-redux';
import MediaPlayer from './MediaPlayback/mediaPlayer'
import CommentForm from './commentForm'


const SingleStory = () => {
    return (
        <div>
            <MediaPlayer />
            <CommentForm />
        </div>
    )
}
const mapState = null;
const mapProps = null;
export default connect(mapState, mapProps)(SingleStory)
