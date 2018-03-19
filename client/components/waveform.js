import React from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'


var testData = {storyId:1, media:[{
  src:'https://d3qi0qp55mx5f5.cloudfront.net/www/i/homepage/spotlight/urban-chicago-spotlight.jpg',
  type:"img",
  start:0,
  end:15,
  options:{caption:'hi'}}]
}

export default class Waveform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: 'violet',
      progressColor: 'purple'
    })
    this.wavesurfer.load(this.props.src)
    var me = this.wavesurfer
    console.log('ME= ', this)
    this.wavesurfer.on('ready', function () {
    //  console.log('IM READY PLAY', me.play)
      me.play();
  });
  }
  handleAddMediaClick(event){
    this.wavesurfer.pause()
    let currentTime = this.wavesurfer.getCurrentTime()


    }


  componentWillUnmount() {
  }

  render() {

    return (
      <div className='waveform'>
      <h1>IM RENDERING</h1>
        <div className='wave'></div>
        <button onClick={this.handleAddMediaClick}>add media</button>
      </div>
    )
  }
}

Waveform.defaultProps = {
  src: "sample.mp3"
}
