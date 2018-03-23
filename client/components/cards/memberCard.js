import React from 'react';
import { connect, } from 'react-redux'

const MemberCard = () => {

  return (
    <div id="groupCardContainer">
      <div id="groupName">{props.group.name}</div>
      <img id="GroupCardImg" src="/groupImg" />
      {/*button here to view/request membership depending on user status*/}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(MemberCard)

//-----IDEAS-----
  //allmemboers tall and to the left, horizontal stack recent and all stories
