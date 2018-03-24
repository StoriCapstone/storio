import React from 'react';
import { connect, } from 'react-redux'

const RateStory = (props) => {

  return (
    <div className="rateStory">
    <div className = "votes">{props.story.upvotes - props.story.downvotes}</div>
      <div className="voteBtnFlex">
        <button className="ratingBtn"><i className="fas fa-caret-up fa-lg" />

        </button>
        <button className="ratingBtn"><i className="fas fa-caret-down fa-lg" />

        </button>
      </div>
      <div className="ratingTitle">{props.story.name}</div>
      <div className="author">By {props.story.user.firstName}</div>
        <img className="ratingImg" src={props.story.thumbnailUrl} />
      {/*button here to view/request Storyship depending on user status*/}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(RateStory)
//everytime there is a new rating check neighbor values, if diff resort
