import React from 'react';
import { connect, } from 'react-redux';
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';
import VideoPlayer from './videoPlayer.js';
import AudioControls from './audioControls';
import { fetchSingleStory, } from '../../store/stories';
import { getMediaUrl, } from '../../utils/s3Utils';
import axios from 'axios';
import { fetchStoryThunk, } from '../../store';

//sort the media by start time

class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      hoverProgress: 0,
      isShowing: false,
      whichShowing: null,
      currentMedia: {},
      fadingOut: false,
    };
    this.handleWaveformHover = this.handleWaveformHover.bind(this);
    this.determineWhichShowing = this.determineWhichShowing.bind(this);
    this.clearMedia = this.clearMedia.bind(this);
    this.setMedia = this.setMedia.bind(this);
    this.imgLoaded = this.imgLoaded.bind(this);
  }

  componentDidMount() {
    this.props.getContent(this.props.match.params.id);
  }

  handleWaveformHover(position) {
    this.setState({ hoverProgress: position.toFixed(2), });
  }

  componentWillReceiveProps({ media, }) {
    if (media !== this.props.media) this.load(media);
  }

  load(media) {
    media && this.wavesurfer.loadBlob(media);
  }

  waveDidMount = container => {
    if (!container) return;
    this.wavesurfer = WaveSurfer.create({
      container,
      waveColor: '#5b76f7',
      progressColor: 'purple',
      height: '90',
      hideScrollbar: true,
      barHeight: 3,
      barWidth: 2,
    });

    let interval = null;
    this.wavesurfer.on('play', () => {
      interval = interval || this.interval();
    });

    this.wavesurfer.on('finish', function() {
      clearInterval(interval);
      interval = null;
    });

    // If we have media, load it into the wavesurfer.
    this.load(this.props.media);
  };

  clearMedia() {
    let FADE_TIME = 1000;
    console.log('clearing media');
    this.setState({ isShowing: false, fadingOut: true, }, );
    setTimeout(() => {
      this.setState({ currentMedia: {}, fadingOut: false, });
    }, FADE_TIME);
  }

  determineWhichShowing(time) {
    let nowSet = this.state.currentMedia;
    console.log('nowSet: ', nowSet);
    // if (nowSet.id) {
    //   console.log(
    //     'time :',
    //     time,
    //     '(.id.start + nowSet.duration): ',
    //     nowSet.start + nowSet.duration
    //   );
    //   console.log('nowSet.duration: ', nowSet.duration);
    //   console.log('nowSet.start: ', nowSet.start);
    //   console.log('IMG SRC --', this.imgEl.src);
    // }
    if (nowSet.id && time >= nowSet.start + nowSet.duration) {
      //check if the media needs to me revmoed
      console.log('time to clear');
      this.clearMedia();
    } else {
      let mediaToSet = this.props.currentStory.media.find(mediaObj => {
        return (
          time >= mediaObj.start && time <= mediaObj.start + mediaObj.duration
        );
      });
      if (!this.state.currentMedia.id && mediaToSet) {
        console.log('there is media to set');
        this.setMedia(mediaToSet);
      } //first check must pass to change media
    }
  }

  async setMedia(media) {
    this.setState({ currentMedia: media, }, async () => {
      if (media.mediaType.startsWith('image')) {
        this.setState({
          currentMedia: {
            ...media,
            src: await getMediaUrl(this.state.currentMedia.key),
          },
        });
      }
      else if (media.mediaType.startsWith('video')){
        this.wavesurfer.pause()
        this.setState({
          currentMedia: media,
        })
       }
    });
  }

  imgLoaded(imgElement) {
    return imgElement.complete && imgElement.naturalHeight !== 0;
  }

  interval() {
    return setInterval(() => {
      let time = this.wavesurfer.getCurrentTime();
      this.determineWhichShowing(time);
      if (this.state.currentMedia.mediaType){
        if (this.state.currentMedia.mediaType.startsWith('image')){
          if (!this.state.isShowing && this.imgEl.src !== null) {
          console.log('the el ==', this.imgEl);
          console.log('isLOaded?:', this.imgLoaded(this.imgEl));
          if (this.imgLoaded(this.imgEl) && !this.state.fadingOut) this.setState({ isShowing: true, });
        }
      } else if (!this.state.fadingOut) {this.setState({isShowing: true, })}
    }
    }, 100);
  }

  render() {
    let user = this.props.currentStory.user || null;
    return (
      <div>
        <div id="storyTitle">
          <div id="storyTitle2"> {this.props.currentStory.name}</div>
          <div align="center" id="storyAuthor">
            by {user ? user.firstName + ' ' + user.lastName : null}
          </div>
        </div>

        <div id="viewContainer">
          <div id="waveContainer">
            <div className="waveform" align="center" />
          </div>
          <div
            // onClick={event => this.pointAdder(event)}
            ref={this.waveDidMount}
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

          <div
            id="mediaWindow"
            style={this.state.isShowing ? { opacity: '1', } : { opacity: '0', }}
          >
          {this.state.currentMedia.mediaType &&

            this.state.currentMedia.mediaType.startsWith('image') ? (
            <img
              ref={imgEl => {this.imgEl = imgEl}}
              id="mediaImg"
              src={this.state.currentMedia.src || null}
            />) : (
              <VideoPlayer
                storyAudio={this.wavesurfer}
                videoUrl={this.state.currentMedia.key}
              />
            )}
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
    dispatch(fetchSingleStory(id));
    dispatch(fetchStoryThunk(id));
  },
});

export default connect(mapState, mapDispatch)(MediaPlayer);
