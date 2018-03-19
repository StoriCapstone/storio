import React, { Component } from 'react'
import ReactPlayer from 'react-player'

export default class VideoPlayer extends Component {
  render () {
    return <ReactPlayer controls = {true} config={{
      youtube: {
        playerVars: { showinfo: 1 },
        preload:true
      }}} url={this.props.videoUrl} onEnded = {()=>this.props.storyAudio.play()} playing={true}/>
  }
}
