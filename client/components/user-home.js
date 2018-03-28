import React from 'react'
import PropTypes from 'prop-types'
import { connect, } from 'react-redux'
import { Link, } from 'react-router-dom'
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { firstName, } = props


  return (
    <div id="pageContainer">
      {
        props.firstName ?
          <h3 id="welcomeMsg" >Welcome, {firstName}</h3>
          :
          <h1 id="motto">Tell stories, better</h1>
      }
      <div id="mainOptions">
        <div className="singleOption">
          <Link to="/recorder">
            <img className="optionImg" src="/microphoneBlue.png" />
            <div className="optionLabel">Record</div>
          </Link>
        </div>
        <div className="singleOption">
          <Link to="/browse">
            <img className="optionImg" src="/searchBlue.png" />
            <div className="optionLabel">Explore</div>
          </Link>
        </div>
        <div className="singleOption">
          <Link to={props.firstName ? '/customHome' : '/loginModal'}>
            <img className="optionImg" src="/homeBlue.png" />
            <div className="optionLabel">Home</div>
          </Link>
        </div>
      </div>
      <div id="testTools">
        <button onClick={() => props.history.push('/mediaPlayer')}>GO TO PLAYER</button>
        <button onClick={() => props.history.push('/addMediaForm')}>GO TO EDIT STORY PAGE</button>
        <button onClick={() => props.history.push('/recorder')}>GO TO RECORDER</button>
      </div>
    </div >
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.user.firstName,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */

UserHome.propTypes = {
  email: PropTypes.string,
}
