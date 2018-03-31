import React from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import store, { setCurrentWaveform, currentTime, toggleAddMediaForm, } from '../store'
import AudioControls from './MediaPlayback/audioControls';

import AddMediaModal from './modals/addMediaModal'


export default class Waveform extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...store.getState(),
      isAdding: false,
      hovering: false,
      hoverProgress: 0, }
    this.handleAddMediaClick = this.handleAddMediaClick.bind(this)
    this.handleWaveformClick = this.handleWaveformClick.bind(this)
this.handleWaveformHover = this.handleWaveformHover.bind(this)
  }
  componentDidMount() {
   // store.dispatch(toggleAddMediaForm()) //we may be able to get rid of this entirely

    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({ //updated this to make styling the same across waveforms
      container: this.$waveform,
      waveColor: '#5b76f7',
      progressColor: 'purple',
      height: '90',
      hideScrollbar: true,
      barHeight: 3,
      barWidth: 2,
    })
    //  var wavesurfer = this.wavesurfer
    //  var wavesurfer = {... wavesurfer, wavesurfer.prototype }
    if (this.state.addMediaForm.currentMP3) { //added this so we can arrive at this component with recording from out recorder
      this.wavesurfer.loadBlob(this.state.addMediaForm.currentMP3) // in case they have URL instead
    }
    store.dispatch(setCurrentWaveform(this.wavesurfer))
    var me = this.wavesurfer

    this.wavesurfer.on('audioprocess', () =>
      store.dispatch(currentTime(this.wavesurfer.getCurrentTime())))
  }
  handleWaveformHover(position) {
    this.setState({ hoverProgress: position.toFixed(2), });
  }

  handleAddMediaClick() {
    this.wavesurfer.pause()
    setTimeout(() =>
      store.dispatch(currentTime(this.wavesurfer.getCurrentTime()))
      , 0)
    //sthis.props.toggleModal()
    this.setState({ isAdding: true, })
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
  //
  componentWillUnmount() {
    this.unsubscribe();
    this.wavesurfer.unAll()
  }
  render() {
    return (
      <div className="waveform" >
        <div


        onMouseEnter={() => this.setState({ hovering: true, })}
        onMouseLeave={() => this.setState({ hovering: false, })}
        onMouseMove={(event) => (this.handleWaveformHover(((event.nativeEvent.layerX / this.wavesurfer.drawer.width) * this.wavesurfer.getDuration().toFixed(2))))}
        className="wave light" onClick={this.handleWaveformClick} />
        <div
        className="hoverProgress light"
        style={this.state.hovering ? { opacity: '1', } : { opacity: '0', }}
      >
        {this.state.hoverProgress}
      </div>
        <AudioControls audio={this.state.waveform.currentWaveform} />

        <button className = "addBtn media" onClick={this.handleAddMediaClick}> <img src="/plusSign.png" className="addBtnImg" />media</button>
        {
          this.state.isAdding ?
            <AddMediaModal parent={this} /> : null
        }
      </div>
    )
  }
}
// Waveform.defaultProps = {
//   src: 'sample.mp3',
// }
