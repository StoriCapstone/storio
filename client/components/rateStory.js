import React from 'react';
import { connect, } from 'react-redux'
import { increaseRating, decreaseRating, } from '../store/voting';

const RateStory = (props) => {

  return (
    <div className="rateStory"  onClick= {() => props.history.push(`/singleStory/${props.story.id}`)}>
      <div className="votes">{props.story.upvotes - props.story.downvotes}</div>
      <div className="voteBtnFlex">
        <button className="ratingBtn upVote" onClick={(event) => props.handleVote(event, props.story)}><i onClick={(event) => props.handleVote(event, props.story)} className="fas fa-caret-up upVote fa-lg" />

        </button>
        <button className="ratingBtn downVote" onClick={(event) => props.handleVote(event, props.story)}><i onClick={(event) => props.handleVote(event, props.story)} className="fas downVote fa-caret-down fa-lg" />

        </button>
      </div>
      <div className="ratingTitle">{props.story.name}</div>
      <div className="author">By {props.story.user.firstName}</div>

      <img className="ratingImg" src="./playBtn.png" />
      {/*button here to view/request Storyship depending on user status*/}
    </div>
  )
}

const mapDispatch = (dispatch) => ({
  handleVote: (event, story) => {
    console.log('event.target.classList: ', event.target.classList);
    event.stopPropagation()
    if ([...event.target.classList, ].includes('upVote')){
      dispatch(increaseRating(story.id))
    } else if ([...event.target.classList, ].includes('downVote')){
      dispatch(decreaseRating(story.id))
    }
  },
})
const mapState = null
export default connect(mapState, mapDispatch)(RateStory)
//everytime there is a new rating check neighbor values, if diff resort
