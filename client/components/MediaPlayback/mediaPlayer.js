import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import VideoPlayer from './videoPlayer.js'
import AudioControls from './audioControls'

//sort the media by start time

class MediaPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowing: false,
      allMedia: {
        storyId: 1,
        media:
          [
            {
              name: 'A photo thang',
              src: 'https://d3qi0qp55mx5f5.cloudfront.net/www/i/homepage/spotlight/urban-chicago-spotlight.jpg',
              type: 'img',
              start: 3,
              end: 5,
              options: { caption: 'hi' }
            },

            {
              name: 'another photo thang',
              src: 'sampleImg.jpg',
              type: 'img',
              start: 7,
              end: 9,
              options: { caption: 'hi' }
            },
            {
              src: 'https://www.youtube.com/watch?v=2lzXpOF5Ssg&list=PLnsTUgMW5W__4eI0349Lu64ljXsrRjhwJ',
              type: 'video',
              start: 12,
              end: 14,
              options: { caption: 'hi' }
            },
          ]
      },
      currentMedia: {}
    }
  }

  componentDidMount() {
    let intervalSet = false
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: '#5b76f7',
      progressColor: 'purple',
      height: '80',
      hideScrollbar: true
    })
    this.wavesurfer.load(this.props.storySrc)
    var self = this
    this.wavesurfer.on('play', function () {
      if (!intervalSet) {
        self.timeChecker = self.interval()
        intervalSet = true
      }
      self.wavesurfer.on('finish', function () {
        clearInterval(self.timeChecker)
      })
    })
  }

  interval() {
    let nextUp = 0;
    return setInterval(() => { //avoids having to check every item in the media array
      let progress = this.wavesurfer.getCurrentTime()
      if (this.state.allMedia.media[nextUp]) {
        if (progress >= this.state.allMedia.media[nextUp].start) {
          this.setState({ currentMedia: this.state.allMedia.media[nextUp++], isShowing: true })
          if (this.state.currentMedia.type === 'video') this.wavesurfer.pause()
        }
      }
      let finishTime = this.state.currentMedia.end || null
      if (finishTime && progress >= finishTime) {
        this.setState({ isShowing: false })
      }
    }, 1000)
  }

  render() {
    return (
      <div id="viewContainer">
        <h2 align="center" id="storyTitle">The Long Road Home</h2>
        <div className="waveform" align="center" />
        <div className="wave" align="center" />
        <AudioControls audio={this.wavesurfer} />
        <div id="mediaContainer" >
          <div id="mediaList" style={this.state.isShowing ? { zIndex: 2, opacity: '0' } : { zIndex: 2, opacity: '1' }} />
          <div id="mediaWindow" style={this.state.isShowing ? { opacity: '1' } : { opacity: '0' }}>
            <div>
              {this.state.currentMedia.type && this.state.currentMedia.type === 'img' ?
                <img id="mediaImg" src={this.state.currentMedia.src} />
                :
                <VideoPlayer storyAudio={this.wavesurfer} videoUrl={this.state.currentMedia.src} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MediaPlayer.defaultProps = {
  storySrc: 'sample.mp3'
}

/**
 * CONTAINER
 */
const mapState = null

const mapDispatch = null

export default connect(mapState, mapDispatch)(MediaPlayer)

