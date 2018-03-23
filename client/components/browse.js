import React from 'react'
import { connect, } from 'react-redux'
import AllItem from './allItem'
/**
 * COMPONENT
 */
export const Browse = (props) => {
  return (
    <div id = "pageContainer">
    <h1>Stories</h1>
    <AllItem items = {props.featuredStories} type = 'story' />
    <h1>Groups</h1>

    <AllItem items = {props.featuredGroups} type = 'group' />
    </div>
  )
}
/**
 * CONTAINER
 */
const madDispatch = null
const mapState = (state)=>{
  return {
  featuredStories:state.stories,
  featuredGroups: state.groups
  }
}

export default connect(mapState, madDispatch)(Browse)

//-----IDEAS------
 //featured stories can simply be the 5 most recently created *public* stories
