import React from 'react'
import { connect, } from 'react-redux'
import AllItem from './AllItem'
/**
 * COMPONENT
 */
export const Home = (props) => {
  return (
    <div id = "pageContainer">
      <div id="newActivity">Here's where we show a 'feed'</div>
      <h1>Your Stories</h1>
      <AllItem items = {props.user.stories} type = 'story'/>
      <h1>Your groups</h1>
      <AllItem items = {props.user.groups} type = 'group'/>
    </div>
  )
}
/**
 * CONTAINER
 */
const madDispatch = null
const mapState = (state)=>{
  return {
    user:state.user
  }
}

export default connect(mapState, madDispatch)(Home)


//-------IDEAS--------
 //newsactivity is a scrolling newsfeed of recent activity
