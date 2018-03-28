import React from 'react';
import { connect, } from 'react-redux'

const StoryCard = (props) => {

  return (
    <div onClick={() => props.history.push(`/singleStory/${props.story.id}`)} className={`storyCard cardContainer ${props.specialClassName || ''}`}>
      <div className={`storyName  ${props.specialClassName || ''}`}>{props.story.name}</div>
        <img className="optionImg cardImg" src={props.story.thumbnailUrl} />
      {/*button here to view/request Storyship depending on user status*/}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(StoryCard)
