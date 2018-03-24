import React from 'react';
import { connect, } from 'react-redux';
import WaveSurfer from 'wavesurfer.js';
import AudioControls from './MediaPlayback/audioControls';

//sort the media by start time

class RecorderPlaybackSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      hoverProgress: 0,
      isShowing: false,
      currentMedia: {},
    };
    this.handleWaveformHover = this.handleWaveformHover.bind(this);
  }

  handleWaveformHover(position) {
    this.setState({ hoverProgress: position.toFixed(2), });
  }

  componentDidMount() {
    this.$waveform = this.self.querySelector('.wave');
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: '#5b76f7',
      progressColor: 'purple',
      height: '90',
      hideScrollbar: true,
      barHeight: 3,
      barWidth: 2,
    });
    this.wavesurfer.loadBlob(this.props.storySrc);
  }

  static pointAdder(event) {
    let point = document.createElement('div');
    point.className = 'point';
    point.style.left = event.clientX + 'px';
    point.style.top = event.clientY + 'px';
    point.style.backgroundColor = 'Blue';
    let wave = document.getElementsByClassName('wave')[0];
    wave.appendChild(point);
  }

  render() {
    return (
      <div ref={(mySelf) => {this.self = mySelf}}>
        <div id="waveContainer">
          <div className="waveform" align="center" />
        </div>
        <div
          onClick={event => RecorderPlaybackSubmit.pointAdder(event)}
          className="wave"
          align="center"
          onMouseEnter={() => this.setState({ hovering: true, })}
          onMouseLeave={() => this.setState({ hovering: false, })}
          onMouseMove={event =>
            this.handleWaveformHover(
              event.nativeEvent.layerX /
                this.wavesurfer.drawer.width *
                this.wavesurfer.getDuration().toFixed(2)
            )
          }
        />
        <div
          className="hoverProgress"
          style={this.state.hovering ? { opacity: '1', } : { opacity: '0', }}
        >
          {this.state.hoverProgress}
        </div>
        <div id="playerControlPanel">
          <AudioControls audio={this.wavesurfer} />
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(RecorderPlaybackSubmit);
