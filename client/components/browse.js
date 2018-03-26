import React from 'react'
import { connect, } from 'react-redux'
import {withRouter} from 'react-router-dom'
import AllItem from './allItem'
import RateStory from './rateStory'
import Carousel from './carousel'
/**
 * COMPONENT
 */
export const Browse = (props) => {
  return (
    <div id="pageContainer">
    <div className = "headerFlex">
      <h1 className="browseHeader" >Featured</h1>
      </div>
      <Carousel id="featuredCarousel" items={props.featuredStories} />

      <div className = "headerFlex">

      <div className="browseHeader">Trending</div>
</div>
      {
        props.trending.map((story) => <RateStory history = {props.history} story={story} />)
      }
      <div className="browseHeader">Featured Groups</div>
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
    trending: state.stories.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)).slice(0, 10),
  }
}

export default withRouter(connect(mapState, madDispatch)(Browse))

//-----IDEAS------
 //featured stories can simply be the 5 most recently created *public* stories
