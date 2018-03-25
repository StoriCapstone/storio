import React from 'react';
import { connect, } from 'react-redux'

const MemberCard = (props) => {

  return (
    <div className="memberCard cardContainer">
      <div className="imgWrapper">
        <img className="memberCardImg cardImg" src={props.member.avatarUrl} />
      </div>
      {/*button here to view/request membership depending on user status*/}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(MemberCard)

