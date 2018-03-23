import React from 'react';
import { connect, } from 'react-redux'

const StoryCard = (props) => {

  return (
    <div className="storyCard cardContainer">
      <div className="storyName">{props.story.name}</div>
      <img className="storyCardImg" src="/groupImg" />
      {/*button here to view/request Storyship depending on user status*/}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(StoryCard)
