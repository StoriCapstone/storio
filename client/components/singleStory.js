import React from 'react';
import { connect } from 'react-redux'

class SingleStory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="pageContainer">
        <div id='headerFlex'>
          <div id="storyName"></div>
          <img id="singleStoryImg" src='storyImg' />
        </div>
        <button>OPEN IN PLAYER</button>
        <Comments />
        <Groups />
        <AllMembers />
      </div>
    )
  }
}
const mapDispatch = null
const mapState = null
export default connect(mapDispatch, matchState)(SingleStory)

//----IDEAS------
 //allmemboers tall and to the left, horizontal stack recent and all stories
 //conditional rendering of group content depending on membership status
 //audio comments!!!
