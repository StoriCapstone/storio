import React from 'react'
import { connect, } from 'react-redux'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import VideoPlayer from './videoPlayer.js'
import AudioControls from './audioControls'
import {fetchSingleStory} from '../../store/stories'

//sort the media by start time

class MediaPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hovering: false,
      hoverProgress: 0,
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
              options: { caption: 'hi', },
            },

            {
              name: 'another photo thang',
              src: 'sampleImg.jpg',
              type: 'img',
              start: 7,
              end: 9,
              options: { caption: 'hi', },
            },
            {
              src: 'https://www.youtube.com/watch?v=-5Ilq3kFxek',
              type: 'video',
              start: 12,
              end: 14,
              options: { caption: 'hi', },
            },
          ],
      },
      currentMedia: {},
    }
    this.handleWaveformHover = this.handleWaveformHover.bind(this)
    this.pointAdder = this.pointAdder.bind(this)
  }

  handleWaveformHover(position) {
    this.setState({ hoverProgress: position.toFixed(2), })
  }

  componentDidMount() {
    // console.log('OF NTIERST:,', this.props.match.params.id)
  this.props.getContent(this.props.match.params.id)
    //console.log('hhhhhhh',a)
    let intervalSet = false
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: '#5b76f7',
      progressColor: 'purple',
      height: '90',
      hideScrollbar: true,
      barHeight: 3,
      barWidth: 2,
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

  pointAdder(event) {
    let point = document.createElement('div')
    point.className = 'point'
    point.style.left = (event.clientX) + 'px'
    point.style.top = (event.clientY) + 'px'
    point.style.backgroundColor = 'Blue'
    let wave = document.getElementsByClassName('wave')[0]
    wave.appendChild(point);
  }


  interval() {
    let nextUp = 0;
    return setInterval(() => { //avoids having to check every item in the media array
      let progress = this.wavesurfer.getCurrentTime()
      if (this.state.allMedia.media[nextUp]) {
        if (progress >= this.state.allMedia.media[nextUp].start) {
          this.setState({ currentMedia: this.state.allMedia.media[nextUp++], isShowing: true, })
          if (this.state.currentMedia.type === 'video') this.wavesurfer.pause()
        }
      }
      let finishTime = this.state.currentMedia.end || null
      if (finishTime && progress >= finishTime) {
        this.setState({ isShowing: false, })
      }
    }, 1000)
  }

  render() {
    console.log('parammmms = ',this.props.currentStory)
    return (
      <div id="mainPlayer">
        <h2 align="center" id="storyTitle">{this.props.currentStory.name||'hi'}</h2>

        <div id="viewContainer" >
          <div id="waveContainer">
            <div className="waveform" align="center" />
          </div>
          <div
            onClick={(event) => this.pointAdder(event)}
            className="wave"
            align="center"

            //onMouseEnter={() => this.setState({ hovering: true, })}
            //onMouseLeave={() => this.setState({ hovering: false, })}
            //onMouseMove={(event) => (this.handleWaveformHover(((event.nativeEvent.layerX / this.wavesurfer.drawer.width) * this.wavesurfer.getDuration().toFixed(2))))}
            />
          <div className="hoverProgress" style={this.state.hovering ? { opacity: '1', } : { opacity: '0', }}>{this.state.hoverProgress}</div>
          <div id="playerControlPanel">
            <AudioControls audio={this.wavesurfer} />
          </div>
          <div id="mediaContainer" >
            <div id="mediaList" style={this.state.isShowing ? { zIndex: 2, opacity: '0', } : { zIndex: 2, opacity: '1', }} />
            <div id="mediaWindow" style={this.state.isShowing ? { opacity: '1', } : { opacity: '0', }}>
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
      </div>
    )
  }
}

MediaPlayer.defaultProps = {
  storySrc: 'sample.mp3',
}

/**
 * CONTAINER
 */
const mapState = (state)=>({
  currentStory : state.stories.current||''
})

const mapDispatch = (dispatch) =>({

    getContent:(id)=>{
      console.log('this worked')
      dispatch(fetchSingleStory(id))}
  }
)

export default connect(mapState, mapDispatch)(MediaPlayer)

