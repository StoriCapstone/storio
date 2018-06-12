import React from 'react';
import { connect, } from 'react-redux';
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';
import VideoPlayer from './videoPlayer.js';
import AudioControls from './audioControls';
import { fetchSingleStory, } from '../../store/stories';
import { getMediaUrl, } from '../../utils/s3Utils';
import axios from 'axios'
import { fetchStoryThunk, } from '../../store';

//sort the media by start time

class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      hoverProgress: 0,
      isShowing: false,
      currentMedia: {},
    };
    this.handleWaveformHover = this.handleWaveformHover.bind(this);
    this.pointAdder = this.pointAdder.bind(this);
  }

  componentDidMount() {

    this.props.getContent(this.props.match.params.id);
  }

  handleWaveformHover(position) {
    this.setState({ hoverProgress: position.toFixed(2), });
  }

  componentWillReceiveProps({ media, }) {
    if (media !== this.props.media) this.load(media)
  }

  load(media) {
    media && this.wavesurfer.loadBlob(media);
  }

  waveDidMount = container => {
    if (!container) return
    this.wavesurfer = WaveSurfer.create({
      container,
      waveColor: '#5b76f7',
      progressColor: 'purple',
      height: '90',
      hideScrollbar: true,
      barHeight: 3,
      barWidth: 2,
    });

    let interval = null
    this.wavesurfer.on('play', () => {
      interval = interval || this.interval();
    });

    this.wavesurfer.on('finish', function () {
      clearInterval(interval);
      interval = null
    });

    // If we have media, load it into the wavesurfer.
    this.load(this.props.media)
  }

  pointAdder(event) {
    let point = document.createElement('div');
    point.className = 'point';
    point.style.left = event.clientX + 'px';
    point.style.top = event.clientY + 'px';
    point.style.backgroundColor = 'Blue';
    let wave = document.getElementsByClassName('wave')[0];
    wave.appendChild(point);
  }

  async interval() {
    let nextUp = 0;
    // this.setState({isShowing:true})

    //  this.setState({currentMedia:{type:'image'}})

    return setInterval(async () => {//sort by start time
      //avoids having to check every item in the media array
      let progress = this.wavesurfer.getCurrentTime();
      if (this.props.currentStory.media[nextUp]) {
        if (progress >= this.props.currentStory.media[nextUp].start) {
          this.currentUrl = await getMediaUrl(this.props.currentStory.media[nextUp].key)

          this.setState({
            currentMedia: this.props.currentStory.media[nextUp++],

           });
          if (this.state.currentMedia.mediaType === 'video') this.wavesurfer.pause();
        }
      }
      let finishTime = this.state.currentMedia.start + this.state.currentMedia.duration || null;
      if (finishTime && progress >= finishTime) {
        this.setState({ isShowing: false, });
        setTimeout(() => this.setState({currentMedia: {}, }), 800)

      }
    }, 1000);
  }

  render() {
    let user = this.props.currentStory.user || null
    return (
      <div >
        <div id="storyTitle">
          <div id ="storyTitle2"> {this.props.currentStory.name}
          </div>
          <div align="center" id="storyAuthor">

             by {user ?
                user.firstName + ' ' + user.lastName
                : null
              }
          </div>
        </div>


        <div id="viewContainer">

          <div id="waveContainer">
            <div className="waveform" align="center" />
          </div>
          <div
            onClick={event => this.pointAdder(event)}
            ref={this.waveDidMount}
            className="wave"
            align="center"

          onMouseEnter={() => this.setState({ hovering: true, })}
          onMouseLeave={() => this.setState({ hovering: false, })}
          onMouseMove={(event) => (this.handleWaveformHover(((event.nativeEvent.layerX / this.wavesurfer.drawer.width) * this.wavesurfer.getDuration().toFixed(2))))}
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
          <div id="mediaContainer">
            <div
              id="mediaList"
              style={
                this.state.isShowing
                  ? { zIndex: 2, opacity: '0', }
                  : { zIndex: 2, opacity: '1', }
              }
            />
            <div
              id="mediaWindow"
              style={this.state.isShowing ? { opacity: '1', } : { opacity: '0', }}
            >
              <div>

                {this.state.currentMedia.mediaType &&

                  this.state.currentMedia.mediaType.startsWith('image') ? (
                    <img id="mediaImg" src={this.currentUrl} />
                  ) : (
                    <VideoPlayer
                      storyAudio={this.wavesurfer}
                      videoUrl={this.currentUrl}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MediaPlayer.defaultProps = {
  storySrc: 'sample.mp3',
};

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => ({
  currentStory: state.story,
  media: state.media[ownProps.match.params.id],
});

const mapDispatch = dispatch => ({
  getContent: id => {
    dispatch(fetchSingleStory(id))
    dispatch(fetchStoryThunk(id));
  },
});

export default connect(mapState, mapDispatch)(MediaPlayer);
