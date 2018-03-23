import React from 'react';
import { connect, } from 'react-redux'

const StoryCard = () => {

  return (
    <div id="storyCardContainer">
      <div id="storyName">{props.story.name}</div>
      <img id="storyCardImg" src="/groupImg" />
      {/*button here to view/request Storyship depending on user status*/}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(StoryCard)
