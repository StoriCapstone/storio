import React from 'react'
import { connect, } from 'react-redux'
import {withRouter, } from 'react-router-dom'
import StoryCard from './cards/storyCard'
import MemberCard from './cards/memberCard'
import GroupCard from './cards/groupCard'
import RatingStory from './rateStory'
/**
 * COMPONENT
 */
const AllItem = (props) => {
  return (
    <div className="allItemsContainer">
      {props.type === 'story' ?
        props.items.map((story) => <StoryCard key = {story.id} history = {props.history} story={story} />)
        :
        props.type === 'group' ?
          props.items.map((group) => <GroupCard key = {group.id} group={group} />)
          :
          props.type === 'member' ?

            props.items.map((member) => <MemberCard key = {member.id} member={member} />)
            :
            props.items.map((rateStory) => <RateStory key = {rateStory.id} story={rateStory} />)
      }
    </div>
  )
}
/**
 * CONTAINER
 */
const madDispatch = null
const mapState = null
export default withRouter(connect(mapState, madDispatch)(AllItem))

//----IDEAS-----
 //This is a generic component to display any number of 'cards'
 //'Cards' can display a single story, user, group etc.
 //Will be used to create the 'allMembers, allStories, allGroups view etc.
