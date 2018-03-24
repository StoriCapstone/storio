import React from 'react';
import { connect, } from 'react-redux'

const GroupCard = (props) => {

  return (
    <div className="groupCard cardContainer">
      <div className="groupName">{props.group.name}</div>
      <div className = "imgWrapper">
      <img className="groupCardImg cardImg" src='/groups.png'/>
      </div>
      {/*button here to view/request membership depending on user status*/}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(GroupCard)

