import React from 'react';
import { connect, } from 'react-redux';
import Waveform from './waveform';
import AddMediaForm from './addMediaForm';
import { withRouter, } from 'react-router-dom'
import ReactPlayer from 'react-player';
import { saveMediaToStory, deleteMediaFromStoryThunk, } from '../store';
import { AddMediaModal, } from './modals/addMediaModal'


class Editor extends React.Component {

  constructor(props) {
    super(props)
    // this.state = ({
    //   isAdding:false
    // })
  }
  render() {
    return (
      <div>
        <div className="header" style={{ marginTop: '3.7vw', }}>Enhance Your Story</div>

        <Waveform />
        {
          // this.state.isAdding ?
          // <AddMediaModal />
          // :
          // ''

        }
        {<h2 id="mediaListHeader" >Media Queue</h2>}
        {
          !this.props.media.length ?
            <div id="emptyMsg">You have not added any media</div>
            : null
        }
        {this.props.media.map((media) => {
          return (
            <div className="addedMediaRow" key={media.key}>
              <div className="mediaInfo" >
                <p style={{ color: 'gold', }}>{media.name}</p>
                <div className="mediaStartEnd">
                  {`Start: ${media.start.toFixed(2)} End: ${(media.start + media.duration).toFixed(2)}`}
                </div>
                </div>

                {media.mediaType.startsWith('image') ? <img className="ratingImg editor" src={media.src} /> : <ReactPlayer url={media.src} />}
                <button className="addBtn editor" onClick={this.props.handleDelete} id={media.key}>delete</button>
            </div>
          )
        })}
        <button className="addBtn media" onClick={(event) => this.props.handleClick(event, this.props.media, this.props.story.id)}>Publish</button>
      </div>);
  }
}

const mapState = (state) => ({
  currentWaveform: state.waveform.currentWaveform,
  media: state.storyMedia,
  story: state.addMediaForm.story,
})
const mapDispatch = (dispatch, ownProps) => ({
  handleClick: (event, media, storyId) => {
    dispatch(saveMediaToStory(media, storyId, ownProps.history))
  },
  handleDelete: (event) => {
    dispatch(deleteMediaFromStoryThunk(event.target.id))
  },
})

export default withRouter(connect(mapState, mapDispatch)(Editor));
