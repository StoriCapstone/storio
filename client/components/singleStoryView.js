import React from 'react';
import { connect, } from 'react-redux';
// import MediaPlayer from './MediaPlayback/mediaPlayer'
import MediaPlayer from './MediaPlayback/newPlayer'
import CommentForm from './commentForm'
import { fetchStoryThunk, } from '../store';
import {withRouter, Link, } from 'react-router-dom'

const SingleComment = (props) => {
    return (
        <div className = "singleComment">
            <p className = "commentContent">{props.commentObj.content}</p>
            <Link to= {`/userProfile/${props.commentObj.userId}`}><h4 className = "commentDisplayName">{props.commentObj.user.displayName}</h4></Link>

        </div>
    )
}
//ask jeff about key on map below
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
                <MediaPlayer match = {{params: {id: this.props.id, }, }} />
                <h2 className = "header comment">Comments:</h2>
                {Object.keys(this.props.story).length ? this.props.allComments.map((commentObj, index, array) => <SingleComment key={`${commentObj.content}_${new Date().getTime()}`} commentObj={commentObj} />) : 'Loading Comments'}
                {Object.keys(this.props.currentUser).length ? <CommentForm /> : <p>Sign in to leave comments</p>}
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
export default withRouter(connect(mapState, mapDispatch)(SingleStory))
