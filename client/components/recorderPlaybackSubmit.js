import React from 'react';
import { connect, } from 'react-redux';
import WaveSurfer from 'wavesurfer.js';
import AudioControls from './MediaPlayback/audioControls';
import { addBlobToS3, } from '../utils';
import { postStory, } from '../store';
import { selectMP3toEdit, } from '../store/';

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
    this.submitAndEditCB = this.submitAndEditCB.bind(this);
    this.getSubmitObj = this.getSubmitObj.bind(this);
    this.handleSubmitAndEdit = this.handleSubmitAndEdit.bind(this);
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
  submitAndEditCB(story) {
    this.props.selectMP3toEdit(this.props.storySrc, story);
    this.props.history.push('/addMediaForm');
  }
  async getSubmitObj() {
    const url = await addBlobToS3(this.props.storySrc, 'mp3');
    const submitObj = {
      url,
      genre: this.state.genre,
      name: this.state.name.trim(),
      mediaLength: Math.ceil(this.wavesurfer.getDuration()),
    };
    return submitObj;
  }
  handleSubmitAndEdit(evt) {
    evt.preventDefault();
    this.getSubmitObj().then(storyObj =>
      this.props.postStory(storyObj, this.submitAndEditCB)
    );
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.getSubmitObj().then(storyObj => this.props.postStory(storyObj));
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
            className="wave light"
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
                    value={this.state.genre}
                    required
                  >
                    <option value="" />
                    {genres.map(genre => <option key={genre}>{genre}</option>)}
                  </select>
                </label>
              </div>
              <input
                type="submit"
                value="Submit and Edit"
                onClick={this.handleSubmitAndEdit}
              />
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

const mapDispatch = { postStory, selectMP3toEdit, };

export default connect(mapState, mapDispatch)(RecorderPlaybackSubmit);
