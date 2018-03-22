import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AWSTest from './AWStest'
/**
 * COMPONENT
 */
 const AllItem = (props) => {
//newsactivity is a scrolling newsfeed of recent activity
  return (
    <div>

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

export default connect(mapState,madDispatch)(AllItem)


