import React from 'react';
import { connect, } from 'react-redux'

const SingleGroup = () => {

  return (
    <div id="pageContainer">
      <div id="headerFlex">
        <div id="groupName" />
        <img id="singleGroupImg" src="groupImg" />
      </div>
      {/*}
      <MostRecent />
      <AllStories />
      <AllMembers />
  */}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(SingleGroup)

//-----IDEAS-----
  //allmemboers tall and to the left, horizontal stack recent and all stories
