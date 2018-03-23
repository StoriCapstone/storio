import React from 'react'
import { connect, } from 'react-redux'
import StoryCard from './cards/storyCard'
import MemberCard from './cards/memberCard'
import GroupCard from './cards/groupCard'

/**
 * COMPONENT
 */
const AllItem = (props) => {
  return (
    <div className="allItemsContainer">
      {props.type === 'story' ?
        props.items.map((story) => <StoryCard story={story} />)
        :
        props.type === 'group' ?
          props.items.map((group) => <GroupCard group={group} />)
          :
          props.items.map((member) => <MemberCard member={member} />)
      }
    </div>
  )
}
/**
 * CONTAINER
 */
const madDispatch = null
const mapState = null
export default connect(mapState, madDispatch)(AllItem)

//----IDEAS-----
 //This is a generic component to display any number of 'cards'
 //'Cards' can display a single story, user, group etc.
 //Will be used to create the 'allMembers, allStories, allGroups view etc.
