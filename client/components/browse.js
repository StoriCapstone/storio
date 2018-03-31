import React from 'react';
import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import AllItem from './allItem';
import RateStory from './rateStory';
import Carousel from './carousel';
import axios from 'axios';
/**
 * COMPONENT
 */
class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingStories: [],
      trendingVotes: {},
      loaded: false,
    };
    this.refreshTrending = this.refreshTrending.bind(this);
    this.vote = this.vote.bind(this);
  }
  refreshTrending() {
    const loaded = true;
    axios
      .get('/api/stories/trending/')
      .then(res => res.data)
      .then(trendingStories => this.setState({ trendingStories, loaded, }));
  }
  componentDidMount() {
    this.refreshTrending();
  }
  vote(id, vote) {
    const uri =
      vote === 1 ? `/api/story/${id}/vote-up` : `/api/story/${id}/vote-down`;
    axios.post(uri, {}).then(() => this.refreshTrending());
  }
  render() {
    return (
      <div id="pageContainer">
        <div className="headerFlex">
          <h1 className="browseHeader">Featured</h1>
        </div>
        <Carousel id="featuredCarousel" items={this.props.featuredStories} />

        <div className="headerFlex">
          <div className="browseHeader">Trending</div>
        </div>
        {this.state.trendingStories.map(story => (
          <RateStory
            key={story.id}
            history={this.props.history}
            story={story}
            voteFunc={this.vote}
          />
        ))}
        <div className = "headerFlex">
        <div className="browseHeader">Featured Groups</div>
        </div>
        <AllItem items={this.props.featuredGroups} type="group" />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const madDispatch = null;
const mapState = state => {
  return {
    featuredStories: state.stories,
    featuredGroups: state.groups,
    trending: state.stories
      .sort(
        (storyA, storyB) =>
          storyB.upvotes -
          storyB.downvotes -
          (storyA.upvotes - storyA.downvotes)
      )
      .slice(0, 10),
  };
};

export default withRouter(connect(mapState, madDispatch)(Browse));

//-----IDEAS------
//featured stories can simply be the 5 most recently created *public* stories
