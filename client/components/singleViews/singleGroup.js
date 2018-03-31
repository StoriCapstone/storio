import React from 'react'
import { connect, } from 'react-redux'
import AllItem from '../allItem'
import AddStoryModal from '../modals/addStory'
import { withRouter } from 'react-router-dom'
import { fetchSingleGroup } from '../../store/groups';
/**
 * COMPONENT
 */
class SingleGroup extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    // this.props.fetchGroup(this.props.match.params.id)'
    this.props.fetchGroup(this.props.match.params.id);
  }
  //todo :need the add story button below to default the group to this group
  render() {
    if (!this.props.group) return null
    return (

      <div id="pageContainer">
      <h1 className = 'header'>{this.props.group.name}</h1>
        <div className="titleAndAddBtnFlex other">
          <div className="headerFlex other">
            <div className="homeLabel other">Stories</div>
          </div>
          <button onClick={() => this.handleNewSubmission('story')} className="addBtn other">
            <img src="/plusSign.png" className="addBtnImg other" />add new</button>
        </div>
        {
          this.props.group.stories.length ?
            <AllItem items={this.props.group.stories.filter(story => story.isPublic)} type="story" />
            :
              <div className = 'header'>This group has no stories</div>

        }
        <div className="titleAndAddBtnFlex other">
          <div className="headerFlex other">
            <div className="homeLabel other">Members</div>
          </div>
          <button onClick={() => this.props.history.push(`/addMembers/${this.props.group.id}`)} className="addBtn other">
            <img src="/plusSign.png" className="addBtnImg" />add new</button>
        </div>

        {
          this.props.group.users.length ?
            <AllItem items={this.props.group.users} history={this.props.history} type="member" />
            :
            <div>
              <div>Be the first person to join this group</div>
            </div>
        }

      </div>
    )
  }
}
/**
 * CONTAINER
 */
const madDispatch = (dispatch) => {
  return {
    fetchGroup: (userId) => {
      dispatch(fetchSingleGroup(userId))
    },

  }
}
const mapState = (state) => {
  return {
    group: state.groups.current
    // group: this.state.group||'',
  }
}

export default withRouter(connect(mapState, madDispatch)(SingleGroup))


//-------IDEAS--------
 //newsactivity is a scrolling newsfeed of recent activity
