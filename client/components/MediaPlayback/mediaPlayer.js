import React from 'react'
import { connect, } from 'react-redux'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import VideoPlayer from './videoPlayer.js'
import AudioControls from './audioControls'
import 'react-tippy/dist/tippy.css'
import {
  Tooltip,
} from 'react-tippy';

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
    this.attachMouseMarker = this.attachMouseMarker.bind(this)
this.pointAdder= this.pointAdder.bind(this)
  }

  handleWaveformHover(position) {
    this.setState({ hoverProgress: position.toFixed(2) })
  }

  componentDidMount() {
    this.attachMouseMarker()

    let intervalSet = false
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: '#5b76f7',
      progressColor: 'purple',
<<<<<<< HEAD
      height: '90',
      hideScrollbar: true,
      barHeight:3,
      barWidth:2
=======
      height: '80',
      hideScrollbar: true,
>>>>>>> 3d0722d559e3313f9edc7d816bcfd97732e71aa5
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
    console.log('fireD')
     let point = document.createElement('div')
    // let canvas = document.querySelector("canvas");
    // context.fillStyle = "red";

        point.className = 'point'
        console.log('x: ',event.clientX, 'y: ',event.clientY, 'point', point)
        point.style.left = (event.clientX-130)+'px'
        point.style.top = (event.clientY-200)+'px'
        point.style.backgroundColor = 'Blue'

        let wave = document.getElementsByClassName('wave')[0]
        console.log(wave.getBoundingClientRect())

        wave.appendChild(point);
      }

  attachMouseMarker(){
    return 'hi'
  // var wave = document.getElementsByTagName('body');

  // wave[0].onclick = function(event){

  //   var that = this,


  //       h = that.offsetHeight,
  //       w = that.offsetWidth,
  //       p = that.parentNode,
  //       d = document.createElement('div');
  //       d.className = 'pointer'
  //       var offset = wave[0].getBoundingClientRect();
  //       console.log('offSet = ', offset)

  //       d.style.left = event.pageX - offset.left,
  //       d.style.top = event.pageY - offset.top
  //       d.zIndex = 2
  //   p.appendChild(d);
  //}

// wave[0].onmouseout = function(){
//   var that = this;
//   that.parentNode.removeChild(that.nextSibling);
// };
};

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
    return (
      <div id = 'mainPlayer'>
      <h2 align="center" id="storyTitle">The Long Road Home</h2>

      <div id="viewContainer" >
      <div id = 'waveContainer'>
        <div className="waveform" align="center" />
        </div>
        <div
        onClick={(event)=>this.pointAdder(event)}
          className="wave"
          align="center"
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
          onMouseMove={(event) => (this.handleWaveformHover(((event.nativeEvent.layerX / this.wavesurfer.drawer.width) * this.wavesurfer.getDuration().toFixed(2))))} />
        <div className='hoverProgress' style={this.state.hovering ? { opacity: '1' } : { opacity: '0' }}>{this.state.hoverProgress}</div>
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
const mapState = null

const mapDispatch = null

export default connect(mapState, mapDispatch)(MediaPlayer)

