import React from 'react'
import { connect, } from 'react-redux'
/**
 * COMPONENT
 */
export const Browse = (props) => {
  return (
    <div>
      <div id="newActivity">FeaturedStories</div>
      <div id="userStories">Groups</div>
    </div>
  )
}
/**
 * CONTAINER
 */
const madDispatch = null
const mapState = null

export default connect(mapState, madDispatch)(Browse)
