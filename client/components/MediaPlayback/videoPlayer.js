import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = () => {

    return (<ReactPlayer
controls = {true} config={{
      youtube: {
        playerVars: { showinfo: 1 },
        preload: true
      }}} url={this.props.videoUrl} onEnded = {() => this.props.storyAudio.play()} playing={true} />)

}
export default VideoPlayer
