import React from 'react';
import { connect, } from 'react-redux'

const StoryCard = (props) => {

  return (
    <div className={`storyCard cardContainer ${props.specialClassName || ''}`}>
      <div className="storyName">{props.story.name}</div>
      <div className="imgWrapper">
        <img className="storyCardImg cardImg" src={props.story.thumbnailUrl} />
      </div>
      {/*button here to view/request Storyship depending on user status*/}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(StoryCard)
