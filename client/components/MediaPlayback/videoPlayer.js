import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = (props) => {

    return (<ReactPlayer
controls = {true} config={{
      youtube: {
        playerVars: { showinfo: 1 },
        preload: true
      }}} url={props.videoUrl} onEnded = {() => props.storyAudio.play()} playing={true} />)

}
export default VideoPlayer
