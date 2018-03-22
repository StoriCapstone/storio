import React from 'react'
import { connect, } from 'react-redux'
/**
 * COMPONENT
 */
const AllItem = (props) => {
  return (
    <div />
  )
}
/**
 * CONTAINER
 */
const madDispatch = null
const mapState = (state) => {
  return {
    email: state.user.email,
  }
}

export default connect(mapState, madDispatch)(AllItem)

//----IDEAS-----
 //This is a generic component to display any number of 'cards'
 //'Cards' can display a single story, user, group etc.
 //Will be used to create the 'allMembers, allStories, allGroups view etc.
