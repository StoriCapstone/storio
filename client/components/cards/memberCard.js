import React from 'react';
import { connect, } from 'react-redux'

const MemberCard = (props) => {

  return (

    <div
onClick={() => {
      props.history.push(`/userProfile/${props.member.id}`)}} className="memberCard cardContainer">
      <div className="imgWrapper">
        <img className="memberCardImg" src={props.member.avatarUrl} />
        <div className ="storyName" >{`${props.member.firstName} ${props.member.lastName}`}</div>
      </div>
      {/*button here to view/request membership depending on user status*/}
    </div>
  )
}

const mapDispatch = null
const mapState = null
export default connect(mapDispatch, mapState)(MemberCard)

