import React from 'react';
import { connect } from 'react-redux';
import Waveform from './waveform';
import AddMediaForm from './addMediaForm';


const Editor = () => {

  return (<div>
    <Waveform />
    <AddMediaForm />
    </div>);
};

const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(Editor);
