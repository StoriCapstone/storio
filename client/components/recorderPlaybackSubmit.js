import React from 'react';
import { connect, } from 'react-redux';
import WaveSurfer from 'wavesurfer.js';
import AudioControls from './MediaPlayback/audioControls';
//sort the media by start time

const genres = [
  'Crime',
  'Memorial',
  'History',
  'Family',
  'Scary',
  'Funny',
  'Educational',
];

class RecorderPlaybackSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      hoverProgress: 0,
      isShowing: false,
      currentMedia: {},
      name: '',
      genre: '',
    };
    this.handleWaveformHover = this.handleWaveformHover.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleWaveformHover(position) {
    this.setState({ hoverProgress: position.toFixed(2), });
  }

  componentDidMount() {
    this.$waveform = this.waveFormEl.querySelector('.wave');
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
  handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    let isValid = false;

    this.setState({
      [name]: value,
      [name + 'Changed']: true,
      [name + 'IsValid']: isValid,
    });
  }
  handleSubmit(evt){
    evt.preventDefault()
    const target = evt.target
    const submitObj = {
      genre: target.genre.value,
      name: target.name.value,
    }
  }
  render() {
    const nameId = 'name';
    const genreId = 'genre';
    return (
      <div>
        <div
          ref={mySelf => {
            this.waveFormEl = mySelf;
          }}
        >
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
        <div>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Story Data</legend>
              <div>
                <label htmlFor={nameId}>
                  Story Name:
                  <input
                    id={nameId}
                    name={nameId}
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.name}
                    required
                    autoComplete="off"
                    placeholder="Please enter a story Name"
                  />
                </label>
                <label htmlFor={genreId}>
                  Genre:
                  <select
                    id={genreId}
                    name={genreId}
                    onChange={this.handleChange}
                    required
                  >
                  <option value="" selected />
                  {genres.map(genre => <option key={genre} >{genre}</option>)}
                  </select>
                </label>
              </div>
              <input type="submit" />
            </fieldset>
          </form>
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
