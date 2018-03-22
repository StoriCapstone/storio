import React from 'react';
import { connect, } from 'react-redux';
import MediaPlayer from './MediaPlayback/mediaPlayer'
import CommentForm from './commentForm'
import { fetchStoryThunk, } from '../store';


const SingleComment = (props) => {
return (
    <div>
        <h4>{props.commentObj.user.displayName}</h4>
        <p>{props.commentObj.content}</p>
    </div>
)
}

class SingleStory extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount(){
        this.props.fetchStory(this.props.match.params.id)
    }
    render(){
    return (
        <div>
        <p>by {this.props.story.user.displayName}</p>
            <MediaPlayer />
            <h2>Comments:</h2>
            {Object.keys(this.props.currentUser).length ? <CommentForm /> : <p>Sign in to leave comments</p>}
            {this.props.allComments.map(commentObj => <SingleComment key={commentObj.id} commentObj={commentObj} />)}
        </div>
    )}
}
const mapState = (state) => ({
    currentUser: state.user,
    allComments: state.story.comments,
    story: state.story,
});
const mapDispatch = (dispatch) => ({
    fetchStory: function (id){
        dispatch(fetchStoryThunk(id))
    },
});
export default connect(mapState, mapDispatch)(SingleStory)
