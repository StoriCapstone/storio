import React from 'react'
import { connect, } from 'react-redux'
import AllItem from './allItem'
/**
 * COMPONENT
 */
export const Browse = (props) => {
  return (
    <div id = "pageContainer">
    <h1>Featured Stories</h1>
    <AllItem items = {props.featuredStories} type = 'story' />
    <h1>User Favorites</h1>
    {
      props.trending.map((story)=><RateStory story={story}/>)
    }
    <h1>Featured Groups</h1>
    <AllItem items = {props.featuredGroups} type = 'group' />
    </div>
  )
}
/**
 * CONTAINER
 */

const madDispatch = null
const mapState = (state)=>{
  return {
  featuredStories:state.stories,
  featuredGroups: state.groups,
  trending: state.stories.sort((a,b)=>a.numLikes>b.numLikes).slice(0,10)
  }
}

export default connect(mapState, madDispatch)(Browse)

//-----IDEAS------
 //featured stories can simply be the 5 most recently created *public* stories
