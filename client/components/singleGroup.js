import React from 'react';
import { connect } from 'react-redux'

class SingleGroup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="pageContainer">
        <div id='headerFlex'>
          <div id="groupName"></div>
          <img id="singleGroupImg" src='groupImg' />
        </div>
        <MostRecent />
        <AllStories />
        <AllMembers />
      </div>
    )
  }
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, matchState)(SingleGroup)

//-----IDEAS-----
  //allmemboers tall and to the left, horizontal stack recent and all stories
