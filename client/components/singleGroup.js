import React from 'react';
import { connect, } from 'react-redux'
import AllItem from './allItem'

const SingleGroup = () => {


  return (
    <div id="pageContainer">
      <div id="headerFlex">
        <div id="groupName">{props.group.name}</div>
        <img id="singleGroupImg" src="/groupImg.jpg" />
      </div>
      <AllItem items={props.group.stories} type="story" />
      <AllItem items={props.group.users} type="member" />
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
