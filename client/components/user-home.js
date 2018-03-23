import React from 'react'
import PropTypes from 'prop-types'
import { connect, } from 'react-redux'
import { Link, } from 'react-router-dom'
import AmazonUpload from './amazonUpload';
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email, } = props


  return (
    <div>
      {
        props.email ?
          <h3 id="welcomeMsg" >Welcome, {email}</h3>
          :
          <h1 id="motto">Tell stories, better</h1>
      }
      <div id="mainOptions">
        <div className="singleOption">
          <Link to="/recorder">
            <img className="optionImg" src="/microphone.png" />
            <div className="optionLabel">Record</div>
          </Link>
        </div>
        <div className="singleOption">
          <Link to="/browse">
            <img className="optionImg" src="/search.png" />
            <div className="optionLabel">Explore</div>
          </Link>
        </div>
        <div className="singleOption">
          <Link to="/customHome">
            <img className="optionImg" src="/home.png" />
            <div className="optionLabel">Home</div>
          </Link>
        </div>
      </div>
      <div id="testTools">
        <button onClick={() => props.history.push('/mediaPlayer')}>GO TO PLAYER</button>
        <button onClick={() => props.history.push('/addMediaForm')}>GO TO EDIT STORY PAGE</button>
        <button onClick={() => props.history.push('/recorder')}>GO TO RECORDER</button>
        <AmazonUpload />
      </div>
    </div >
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
