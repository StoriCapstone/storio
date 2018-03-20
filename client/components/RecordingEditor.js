import React from 'react';
import { connect } from 'react-redux';
import Waveform from './waveform';
import AddMediaForm from './addMediaForm';
import AudioControls from './MediaPlayback/audioControls'


const Editor = (props) => {
  return (<div>
    <Waveform />
    <AudioControls audio={ props.currentWaveform } />
    <AddMediaForm />
    </div>);
};

const mapState = (state) => ({
  currentWaveform: state.waveform.currentWaveform
})
const mapDispatch = null

export default connect(mapState, mapDispatch)(Editor);
