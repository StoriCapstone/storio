import React from 'react'
import { connect, } from 'react-redux'
import AllItem from './allItem'
import RateStory from './rateStory'
import Carousel from './carousel'
/**
 * COMPONENT
 */
export const Browse = (props) => {
  return (
    <div id="pageContainer">
      <h1 className="browseHeader" >Featured Stories</h1>
      <Carousel id="featuredCarousel" items={props.featuredStories} />
      <h1 className="browseHeader">User Favorites</h1>
      {
        props.trending.map((story) => <RateStory story={story} />)
      }
      <h1 className="browseHeader">Featured Groups</h1>
      <AllItem items={props.featuredGroups} type="group" />
    </div>
  )
}
/**
 * CONTAINER
 */
const madDispatch = null
const mapState = (state) => {
  return {
    featuredStories: state.stories,
    featuredGroups: state.groups,
    trending: state.stories.sort((a, b) => (a.upvotes-a.downvotes) > (b.upvotes-b.downvotes)).slice(0, 10),
  }
}

export default connect(mapState, madDispatch)(Browse)

//-----IDEAS------
 //featured stories can simply be the 5 most recently created *public* stories
