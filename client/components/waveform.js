import React from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import store, { setCurrentWaveform, currentTime, toggleAddMediaForm } from '../store'


var testData = {
  storyId: 1, media: [{
    src: 'https://d3qi0qp55mx5f5.cloudfront.net/www/i/homepage/spotlight/urban-chicago-spotlight.jpg',
    type: 'img',
    start: 0,
    end: 15,
    options: { caption: 'hi' }
  }]
}
export default class Waveform extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleAddMediaClick = this.handleAddMediaClick.bind(this)
    this.handleWaveformClick = this.handleWaveformClick.bind(this)
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: 'violet',
      progressColor: 'purple'
    })
    //  var wavesurfer = this.wavesurfer
    //  var wavesurfer = {... wavesurfer, wavesurfer.prototype }
    this.wavesurfer.load(this.props.src)
    store.dispatch(setCurrentWaveform(this.wavesurfer))
    var me = this.wavesurfer
    console.log('ME= ', this.wavesurfer)
    this.wavesurfer.on('ready', function () {
      me.play();
    });
    this.wavesurfer.on('audioprocess', () =>
      store.dispatch(currentTime(this.wavesurfer.getCurrentTime())))
  }
  handleAddMediaClick() {
    this.wavesurfer.pause()
    setTimeout(() =>
      store.dispatch(currentTime(this.wavesurfer.getCurrentTime()))
      , 0)
    store.dispatch(toggleAddMediaForm())

  }
  //   this.wavesurfer.on('audioprocess', () =>
  //   store.dispatch(currentTime(this.wavesurfer.getCurrentTime()))
  // )

handleWaveformClick() {
  setTimeout(() =>
    store.dispatch(currentTime(this.wavesurfer.getCurrentTime()))
    , 0)
}
//   }
//   }

componentWillUnmount() {
  this.unsubscribe();
  this.wavesurfer.unAll()
}
render() {
  return (
    <div className="waveform">
      <div className="wave" onClick={this.handleWaveformClick} />
      <button onClick={this.handleAddMediaClick}>add media</button>
      <div className={testData.media.length ? 'mediaViewer' : 'mediaViewer hidden'} />
    </div>
  )
}
}
Waveform.defaultProps = {
  src: 'sample.mp3'
}
