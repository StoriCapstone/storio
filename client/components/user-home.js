import React from 'react'
import PropTypes from 'prop-types'
import {connect, } from 'react-redux'
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, } = props

  return (
    <div>
      <h3>Welcome, {email}</h3>

      <button onClick= {() => props.history.push('/mediaPlayer')}>GO TO PLAYER</button>
      <button onClick= {() => props.history.push('/addMediaForm')}>GO TO EDIT STORY PAGE</button>

    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
