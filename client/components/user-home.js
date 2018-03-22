import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
/**
 * COMPONENT
 */
export const Landing = (props) => {
  const { email } = props

  return (
    <div>
      {
        props.email ?
          <h3 id='welcomeMsg' >Welcome, {email}</h3>
          :
          <h1 id="motto">Tell stories, better</h1>
      }
      <div id='mainOptions'>
        <div className='singleOption'>
          <img className='optionImg' src='/microphone.png' />
          <div className='optionLabel'>Record</div>
        </div>
        <div className='singleOption'>
          <img className='optionImg' src='/search.png' />
          <div className='optionLabel'>Explore</div>
        </div>
        <div className='singleOption'>
          <img className='optionImg' src='/home.png' />
          <div className='optionLabel'>Home</div>
        </div>
      </div>
      <div style={{ marginTop: '15vw' }}>
        <button onClick={() => props.history.push('/mediaPlayer')}>GO TO PLAYER</button>
        <button onClick={() => props.history.push('/addMediaForm')}>GO TO EDIT STORY PAGE</button>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Landing)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
