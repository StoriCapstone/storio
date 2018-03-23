import React from 'react';
import { connect, } from 'react-redux'

const GroupCard = () => {

  return (
    <div id="groupCardContainer">
      <div id="groupName">{props.group.name}</div>
      <img id="groupCardImg" src="/groupImg" />
      {/*button here to view/request membership depending on user status*/}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(GroupCard)

