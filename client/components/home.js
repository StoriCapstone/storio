import React from 'react'
import { connect, } from 'react-redux'
import AllItem from './allItem'
/**
 * COMPONENT
 */
export const Home = (props) => {
  return (
    <div id = "pageContainer">
      <div id="newActivity">Here's where we show a 'feed'</div>
      <div className = "titleAndAddBtnFlex">

      <h1 className = "homeLabel">Your Stories</h1>
      <button className= "addStoryBtn addBtn">+ Story</button>
      </div>
      {
        props.user.stories.length?
      <AllItem items = {props.user.stories} type = 'story'/>
      :
      <div>
      <div>You haven't recorded any stories</div>
      </div>
      }
      <div className = "titleAndAddBtnFlex">
      <h1 className = "homeLabel">Your groups</h1>
      <button className = "addGroupBtn addBtn">+ Group</button>
      </div>
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
