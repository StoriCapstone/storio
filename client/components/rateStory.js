import React from 'react';
import { connect, } from 'react-redux'

const RateStory = (props) => {

  return (
    <div className="rateStory">
      <div className='voteBtnFlex'>
        <button className='ratingBtn'>upvote</button>
        <button className='ratingBtn'>downvote</button>
      </div>
      <div className="ratingTitile">{props.story.name}</div>
      <div className="author">{props.story.title}</div>
      <div className="imgWrapper">
        <img className="ratingImg" src={props.story.thumbnailUrl} />
      </div>
      {/*button here to view/request Storyship depending on user status*/}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(RateStory)
//everytime there is a new rating check neighbor values, if diff resort
