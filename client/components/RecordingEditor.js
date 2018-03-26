import React from 'react';
import { connect, } from 'react-redux';
import Waveform from './waveform';
import AddMediaForm from './addMediaForm';
import AudioControls from './MediaPlayback/audioControls';
import VideoPlayer from './MediaPlayback/videoPlayer';
import { saveMediaToStory, } from '../store';


const Editor = (props) => {
  return (<div>
    <Waveform />
    <AudioControls audio={props.currentWaveform} />
    <AddMediaForm />
    {!!props.media.length && <h2>media list:</h2>}
    {props.media.map((media) => {
      return (
      <div key={media.key}>
      <p>{media.name}</p>
      {media.mediaType.startsWith('image') ? <img src={media.src} /> : <VideoPlayer storyAudio={props.currentWaveform} videoUrl={media.src} />}
      <button id={media.key}>delete</button>
      </div>
    )})}
    <button onClick={(event) => props.handleClick(event, props.media, props.story.id)}>Done adding media</button>
  </div>);
};

const mapState = (state) => ({
  currentWaveform: state.waveform.currentWaveform,
  media: state.media,
  story: state.addMediaForm.story,
})
const mapDispatch = (dispatch, ownProps) => ({
  handleClick: (event, media, storyId) => {
    dispatch(saveMediaToStory(media, storyId, ownProps.history))
  },
})

export default connect(mapState, mapDispatch)(Editor);
