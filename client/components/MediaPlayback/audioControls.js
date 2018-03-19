import React from "react";

class AudioControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: this.props.isVisible };

    // this.handleLoad = this.handleLoad.bind(this)
  }


  render() {
    return (
      <div id="controlsContainer">
        <button className = 'audioControlBtn' onClick={()=>this.props.audio.skipBackward()
        } id='seekBackSlow'>
          <i className="fas fa-step-backward"></i>
        </button>
        <button className = 'audioControlBtn' onClick={()=>{
          this.props.audio.skipBackward()
          this.props.audio.skipBackward()
          this.props.audio.skipBackward()
          this.props.audio.skipBackward()
          this.props.audio.skipBackward()

        }} id='seekBackFast'>
          <i className="fas fa-fast-backward"></i>
        </button>
        <button className = 'audioControlBtn' onClick={()=>this.props.audio.playPause()} id='playPause'><i className="fas fa-play"></i>

        </button>
        <button className = 'audioControlBtn' onClick={()=>{
          this.props.audio.skipForward()
          this.props.audio.skipForward()
          this.props.audio.skipForward()
          this.props.audio.skipForward()
          this.props.audio.skipForward()
        }} id='seekForwardFast'>
          <i className="fas fa-fast-forward"></i>
        </button>
        <button className = 'audioControlBtn' onClick={()=>this.props.audio.skipForward()} id='seekForwardSlow'>
          <i className="fas fa-step-forward"></i>
        </button>



      </div>

    )
  }
}
export default AudioControls;
