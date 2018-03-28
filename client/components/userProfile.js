import React from 'react'
import { connect, } from 'react-redux'
import AllItem from './allItem'
import AddStoryModal from './modals/addStory'
import AddGroupModal from './modals/addGroup'
import {withRouter, } from 'react-router-dom'
import { getProfileThunk, } from '../store/profile';
/**
 * COMPONENT
 */
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount(){
      this.props.fetchUserInfo(this.props.match.params.id)
  }
  render() {
      if (!this.props.user || !this.props.user.stories) return null
    return (

      <div id="pageContainer">
        <div className="titleAndAddBtnFlex">
          <h1 className="homeLabel">{this.props.user.displayName}'s Stories</h1>
        </div>
        {
          this.props.user.stories.length ?
            <AllItem items={this.props.user.stories.filter(story => story.isPublic)} type="story" />
            :
            <div>
              <div>{this.props.user.displayName} hasn't recorded any stories</div>
            </div>
        }
        <div className="titleAndAddBtnFlex">
          <h1 className="homeLabel">{this.props.user.displayName}'s groups</h1>
        <AllItem items={this.props.user.groups.filter(group => group.isPublic)} history = {this.props.history} type="group" />
      </div>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const madDispatch = (dispatch) => {
  return {
  fetchUserInfo: (userId) => {
    dispatch(getProfileThunk(userId))
  },

  }
}
const mapState = (state) => {
  return {
    user: state.profile,
  }
}

export default withRouter(connect(mapState, madDispatch)(Profile))


//-------IDEAS--------
 //newsactivity is a scrolling newsfeed of recent activity
