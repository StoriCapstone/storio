import React from 'react';
// import ReactDOM from 'react-dom'
import { connect, } from 'react-redux';
import {
  changeMediaEntryMethod,
  updateFormContent,
  clearAddMediaForm,
  changeMediaType,
} from '../store/addMediaForm';
import { addMediaToStory, } from '../store/media';
import { addBlobToS3, getMediaUrl, } from '../utils';
import Axios from 'axios';

// var testData = {storyId:1, media:[{
//     src: 'https://d3qi0qp55mx5f5.cloudfront.net/www/i/homepage/spotlight/urban-chicago-spotlight.jpg',
//     type: "img",
//     start: 0,
//     end: 15,
//     options: {caption: 'hi'}}]
//   }

const AddMediaForm = props => {
  return (
    <form
      onSubmit={event => {
        props.handleSubmit(event, props.time)
        props.modal.onCloseModal()


      }}
      id="addMedia"
      className={props.show ? '' : 'hide'}
    >
      <div className="radioFlex">
        <div className="inputAndLabel">
          <input
            className="mediaInput"
            type="radio"
            defaultChecked
            onChange={props.handleFileOrUrlChange}
            name={'fileOrUrl'}
            value={'file'}
            id={'file'}
          />
          <label className="mediaInputLabel" htmlFor="file">
            import file
          </label>
        </div>
        <div className="inputAndLabel">
          <input
            className="mediaInput"
            type="radio"
            name={'fileOrUrl'}
            onChange={props.handleFileOrUrlChange}
            value={'url'}
            id={'url'}
          />
          <label className="mediaInputLabel" htmlFor="url">
            url of media
          </label>
        </div>
      </div>
      {props.selectedOption === 'file' ? (
        <fieldset form="addMedia">
          <label className="mediaInputLabel">Upload media</label>
          <input className="mediaInput" type="file" name={'file'} />
        </fieldset>
      ) : (
        <fieldset form="addMedia">
          <label className="mediaInputLabel">Url</label>
          <input
            className="mediaInput"
            type="text"
            value={props.src}
            onChange={props.handleTextChenge}
            name={'src'}
          />
          <label className="mediaInputLabel">select type</label>
          <input
            className="mediaInput"
            onChange={props.handleImageOrVideoChange}
            type="radio"
            defaultChecked
            name={'type'}
            value={'image'}
            id={'type1'}
          />
          <label className="mediaInputLabel" htmlFor="type1">
            image
          </label>
          <input
            className="mediaInput"
            onChange={props.handleImageOrVideoChange}
            type="radio"
            name={'type'}
            value={'video'}
            id={'type2'}
          />
          <label className="mediaInputLabel" htmlFor="type2">
            video
          </label>
        </fieldset>
      )}

      <p id="mediaTime">start at: {props.time.toFixed(2)}</p>
      <label className="mediaInputLabel"> {props.mediaType === 'image' || props.selectedOption === 'file' ? 'Duration' : ''}</label>
      {props.mediaType === 'image' || props.selectedOption === 'file' ? (<input
        className="mediaInput"
        type="number"
        value={props.duration}
        onChange={props.handleTextChenge}
        name={'duration'}
      />) : null}
      <label className="mediaInputLabel"> Caption (optional)</label>
      <input
        className="mediaInput"
        type="text"
        value={props.caption}
        onChange={props.handleTextChenge}
        name={'caption'}
      />
      <label className="mediaInputLabel"> Name of Media</label>
      <input
        className="mediaInput"
        type="text"
        value={props.name}
        onChange={props.handleTextChenge}
        name={'name'}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

const mapState = state => ({
  selectedOption: state.addMediaForm.selectedOption,
  time: state.addMediaForm.time,
  show: state.waveform.toggleAddMediaForm,
  duration: state.addMediaForm.duration,
  caption: state.addMediaForm.caption,
  name: state.addMediaForm.name,
  src: state.addMediaForm.src,
  mediaType: state.addMediaForm.mediaType,
});
const mapDispatch = dispatch => ({
  handleTextChenge: event => {
    var content = {};
    content[event.target.name] = event.target.value;
    dispatch(updateFormContent(content));
  },
  handleFileOrUrlChange: event => {
    dispatch(changeMediaEntryMethod(event.target.value));
  },
  handleImageOrVideoChange: event => {
    dispatch(changeMediaType(event.target.value));
  },
  handleSubmit: (event, time) => {
    event.preventDefault();
    event.persist();
    // var nativeEvent = event.nativeEvent;
    if (event.target.fileOrUrl.value === 'file') {
      let extension = event.target.file[1].files[0].name.split('.');
      extension = extension[extension.length - 1];
      addBlobToS3(event.target.file[1].files[0], extension).then(
        async filename => {
          var source = await getMediaUrl(filename);
          dispatch(
            addMediaToStory({
              src: source,
              key: filename,
              mediaType: event.target.file[1].files[0].type,
              start: time,
              duration: +event.target.duration.value,
              caption: event.target.caption.value,
              name: event.target.name.value,
            })
          );
          dispatch(clearAddMediaForm());
        }
      );
    } else if (event.target.fileOrUrl.value === 'url') {
      if (event.target.type.value === 'image') {
        Axios.get(event.target.src.value, { responseType: 'blob', })
          .then(res => res.data)
          .then(file => {
            let extension = event.target.src.value.split('.');
            extension = extension[extension.length - 1];
            return addBlobToS3(file, extension);
          })
          .then(async filename => {
            var source = await getMediaUrl(filename);
            dispatch(
              addMediaToStory({
                src: source,
                key: filename,
                mediaType: event.target.type.value,
                start: time,
                duration: +event.target.duration.value,
                caption: event.target.caption.value,
                name: event.target.name.value,
              })
            );
            dispatch(clearAddMediaForm());
          });
      } else {
        dispatch(
          addMediaToStory({
            src: event.target.src.value,
            key: event.target.src.value,
            mediaType: event.target.type.value,
            start: time,
            duration: 0.2,
            caption: event.target.caption.value,
            name: event.target.name.value,
          })
        );
        dispatch(clearAddMediaForm());
      }
    }
  },
});

export default connect(mapState, mapDispatch)(AddMediaForm);
