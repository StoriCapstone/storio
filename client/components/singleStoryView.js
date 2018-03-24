import React from 'react';
import { connect, } from 'react-redux';
import MediaPlayer from './MediaPlayback/mediaPlayer'
import CommentForm from './commentForm'
import { fetchStoryThunk, } from '../store';


const SingleComment = (props) => {
    return (
        <div>
            <h4>{props.commentObj.user.displayName}:</h4>
            <p>{props.commentObj.content}</p>
        </div>
    )
}

class SingleStory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        this.props.fetchStory(this.props.id)
    }
    render() {
        return (
            <div>
                <p>by {Object.keys(this.props.story).length ? this.props.story.user.displayName : 'Loading'}</p>
                <MediaPlayer />
                <h2>Comments:</h2>
                {Object.keys(this.props.currentUser).length ? <CommentForm /> : <p>Sign in to leave comments</p>}
                {Object.keys(this.props.story).length ? this.props.allComments.map((commentObj, index, array) => <SingleComment key={commentObj.id ? commentObj.id : array[array.length - 2].id + 1} commentObj={commentObj} />) : 'Loading Comments'}
            </div>
        )
    }
}
const mapState = (state, ownProps) => ({
    currentUser: state.user,
    allComments: state.story.comments,
    story: state.story,
    id: ownProps.match.params.id,
});
const mapDispatch = (dispatch) => ({
    fetchStory: function (id) {
        dispatch(fetchStoryThunk(id))
    },
});
export default connect(mapState, mapDispatch)(SingleStory)
