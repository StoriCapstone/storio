import React from 'react';
import store, { currentTime, } from '../../store'

class AudioControls extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { isVisible: this.props.isVisible };
    this.state = store.getState();

    // this.handleLoad = this.handleLoad.bind(this)
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => store.getState())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <div id="controlsContainer">
        <button
          className="audioControlBtn" onClick={() => {
            this.props.audio.skipBackward()
            var self = this
            setTimeout(() =>
              store.dispatch(currentTime(self.props.audio.getCurrentTime()))
              , 0)
          }
          } id="seekBackSlow">
          <i className="fas fa-step-backward" />
        </button>
        <button
          className="audioControlBtn" onClick={() => {
            this.props.audio.skipBackward()
            this.props.audio.skipBackward()
            this.props.audio.skipBackward()
            this.props.audio.skipBackward()
            this.props.audio.skipBackward()
            var self = this
            setTimeout(() =>
              store.dispatch(currentTime(self.props.audio.getCurrentTime()))
              , 0)
          }} id="seekBackFast">
          <i className="fas fa-fast-backward" />
        </button>
        <button className="audioControlBtn" onClick={() => this.props.audio.playPause()} id="playPause"><i className="fas fa-play" />

        </button>
        <button
          className="audioControlBtn" onClick={() => {

            this.props.audio.skipForward()
            this.props.audio.skipForward()
            this.props.audio.skipForward()
            this.props.audio.skipForward()
            this.props.audio.skipForward()
            var self = this
            setTimeout(() =>
              store.dispatch(currentTime(self.props.audio.getCurrentTime()))
              , 0)
          }} id="seekForwardFast">
          <i className="fas fa-fast-forward" />
        </button>
        <button
          className="audioControlBtn" onClick={() => {
            this.props.audio.skipForward()
            var self = this
            setTimeout(() =>
              store.dispatch(currentTime(self.props.audio.getCurrentTime()))
              , 0)
          }} id="seekForwardSlow">
          <i className="fas fa-step-forward" />
        </button>


      </div>

    )
  }
}
export default AudioControls;
