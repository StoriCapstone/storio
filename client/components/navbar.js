import React from 'react'
import PropTypes from 'prop-types'
import { connect, } from 'react-redux'
import { Link, } from 'react-router-dom'
import { logout, } from '../store'

const Navbar = ({ handleClick, isLoggedIn, }) => (
  <div id="navBarFlex">

    <div id="titleLogoFlex">
      <Link to="/">
        <h1 id="siteTitle">storio</h1>
      </Link>
      <Link to="/home">
        <img id="titleLogoImg" src="/storiLogo.png" />
      </Link>
    </div>

    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/customHome">Home</Link>
          <a href="/login" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
