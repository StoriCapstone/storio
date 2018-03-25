import React from 'react'
import { connect, } from 'react-redux'
import AllItem from './allItem'
import AddStoryModal from './modals/addStory'
import AddGroupModal from './modals/addGroup'

/**
 * COMPONENT
 */
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdding: false,
      addingStoryVsGroup: null
    }
    this.handleNewSubmission = this.handleNewSubmission.bind(this)
  }

  handleNewSubmission(type) {
    this.setState({ isAdding: true, addingStoryVsGroup: type })

  }
  render() {
    return (

      <div id="pageContainer">
        {
          this.state.isAdding ?
            (this.state.addingStoryVsGroup === 'story' ?
              <AddStoryModal />
              : <AddGroupModal />
            )
            : null
        }
        <div id="newActivity">Here's where we show a 'feed'</div>
        <div className="titleAndAddBtnFlex">
          <h1 className="homeLabel">Your Stories</h1>
          <button onClick={() => this.handleNewSubmission('story')} className="addStoryBtn addBtn">
            <img src='/plusSign.png' className='addBtnImg' />Story</button>
        </div>
        {
          this.props.user.stories.length ?
            <AllItem items={this.props.user.stories} type="story" />
            :
            <div>
              <div>You haven't recorded any stories</div>
            </div>
        }
        <div className="titleAndAddBtnFlex">
          <h1 className="homeLabel">Your groups</h1>
          <button onClick={() => this.handleNewSubmission('group')} className="addGroupBtn addBtn">
            <img src='/plusSign.png' className='addBtnImg' /> Group</button>
        </div>
        <AllItem items={this.props.user.groups} type="group" />
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const madDispatch = null
const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState, madDispatch)(Home)


//-------IDEAS--------
 //newsactivity is a scrolling newsfeed of recent activity
