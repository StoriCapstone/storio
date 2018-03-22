import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AWSTest from './AWStest'
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props
  return (
    <div>
      <div id='newActivity'>Here's where we show a 'feed'</div>
      <div id='userStories'>Stories made by the user</div>
      <div id='userGroups'>Groups to which user belongs</div>
    </div>
  )
}
/**
 * CONTAINER
 */
const madDispatch = null
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState,madDispatch)(Home)


//-------IDEAS--------
 //newsactivity is a scrolling newsfeed of recent activity
