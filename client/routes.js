import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { withRouter, Route, Switch, } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  LoginOrSignupModal,
  Recorder,
  Login,
  Signup,
  UserHome,
  MediaPlayer,
  RecordingEditor,
  Browse,
  Home,
  AddMembersToGroups,
  Profile,
  SingleGroup,
} from './components';
import { me, } from './store';
import { fetchAllStories, } from './store/stories';
import { fetchAllGroups, } from './store/groups';

import SingleStory from './components/singleStoryView';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

        // <Route path="/singleStory/:id" component={SingleStory} />

  render() {
    const { isLoggedIn, } = this.props;
//todo: which of the single story route below do we want to keep?
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={UserHome} />
        <Route path="/customHome" component={Home} />
        <Route path="/browse" component={Browse} />
        <Route path="/listen/:id" component={MediaPlayer} />
        <Route path="/loginModal" component={LoginOrSignupModal} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/mediaPlayer" component={MediaPlayer} />
        <Route path="/addMediaForm" component={RecordingEditor} />
        {/* temp for testing */}
        <Route path="/recorder" component={Recorder} />
        <Route path="/singleGroup/:id" component={SingleGroup} />
        <Route path="/addMembers/:id" component={AddMembersToGroups} />

        <Route
path="/singleStory/:id" location={this.props.location} key={this.props.location.key} render={({ location, match, }) => (
          <SingleStory key={this.props.location.key}  params={match.params} />
      )} />
        <Route path="/userProfile/:id" component={Profile} />


        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};
const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchAllStories());
      dispatch(fetchAllGroups());
    },
  };
};
// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
