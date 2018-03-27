import React from 'react';
// import ReactDOM from 'react-dom'
import { connect, } from 'react-redux';
import { changeMediaEntryMethod, updateFormContent, clearAddMediaForm, } from '../store/addMediaForm';
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
        onSubmit={(event) => props.handleSubmit(event, props.time)}
        id="addMedia"
        className={props.show ? '' : 'hide'}
      ><div className = "radioFlex">
      <div className = "inputAndLabel">

        <input
          type="radio"
          defaultChecked
          onChange={props.handleFileOrUrlChange}
          name={'fileOrUrl'}
          value={'file'}
          id={'file'}
        />
        <label htmlFor="file">import file</label>
        </div>
        <div className = "inputAndLabel">

        <input
          type="radio"
          name={'fileOrUrl'}
          onChange={props.handleFileOrUrlChange}
          value={'url'}
          id={'url'}
        />
        <label htmlFor="url">url of media</label>

        </div>
        </div>
        {props.selectedOption === 'file' ? (
          <fieldset form="addMedia">
            <label>Upload media</label>
            <input type="file" name={'file'} />
          </fieldset>
        ) : (
          <fieldset form="addMedia">
            <label>Url</label>
            <input type="text" value={props.src} onChange={props.handleTextChenge} name={'src'} />
            <label>select type</label>
            <input
              type="radio"
              defaultChecked
              name={'type'}
              value={'image'}
              id={'type1'}
            />
            <label htmlFor="type1">image</label>
            <input type="radio" name={'type'} value={'video'} id={'type2'} />
            <label htmlFor="type2">video</label>
          </fieldset>
        )}

        <p id = "mediaTime" >start at: {props.time.toFixed(2)}</p>
        <label> Duration</label>
        <input type="number" value={props.duration} onChange={props.handleTextChenge} name={'duration'} />
        <label> Caption (optional)</label>
        <input type="text" value={props.caption} onChange={props.handleTextChenge} name={'caption'} />
        <label> Name of Media</label>
        <input type="text" value={props.name} onChange={props.handleTextChenge} name={'name'} />
        <button type="submit">Submit</button>
      </form>
    );
  }

const mapState = state => ({
  selectedOption: state.addMediaForm.selectedOption,
  time: state.addMediaForm.time,
  show: state.waveform.toggleAddMediaForm,
  duration: state.addMediaForm.duration,
  caption: state.addMediaForm.caption,
  name: state.addMediaForm.name,
  src: state.addMediaForm.src,
});
const mapDispatch = (dispatch) => ({
    handleTextChenge: (event) => {
        var content = {};
        content[event.target.name] = event.target.value
        dispatch(updateFormContent(content))
    },
    handleFileOrUrlChange: event => {
        dispatch(changeMediaEntryMethod(event.target.value))
    },
    handleSubmit: (event, time) => {
        event.preventDefault();
        event.persist();
        // var nativeEvent = event.nativeEvent;
        if (event.target.fileOrUrl.value === 'file') {
          let extension = event.target.file[1].files[0].name.split('.');
          extension = extension[extension.length - 1];
          addBlobToS3(event.target.file[1].files[0], extension).then(async (filename) => {
            var source = await getMediaUrl(filename)
            dispatch(addMediaToStory({
                src: source,
                key: filename,
                mediaType: event.target.file[1].files[0].type,
                start: time,
                duration: +event.target.duration.value,
                caption: event.target.caption.value,
                name: event.target.name.value,
              }
            ));
        dispatch(clearAddMediaForm());
    });
        } else if (event.target.fileOrUrl.value === 'url') {
          if (event.target.type.value === 'image') {
            Axios.get(event.target.src.value, {responseType: 'blob', })
              .then(res => res.data)
              .then(file => {
                let extension = event.target.src.value.split('.');
                extension = extension[extension.length - 1];
                return addBlobToS3(file, extension);
              })
              .then(async filename => {
              var source = await getMediaUrl(filename)
              dispatch(addMediaToStory({
                    src: source,
                    key: filename,
                    mediaType: event.target.type.value,
                    start: time,
                    duration: +event.target.duration.value,
                    caption: event.target.caption.value,
                    name: event.target.name.value,
                  }
                ));
        dispatch(clearAddMediaForm());
    });
          } else {
              dispatch(addMediaToStory({
                src: event.target.src.value,
                key: event.target.src.value,
                mediaType: event.target.type.value,
                start: time,
                duration: +event.target.duration.value,
                caption: event.target.caption.value,
                name: event.target.name.value,
              }))
            dispatch(clearAddMediaForm())
          }
        }
      },
});

export default connect(mapState, mapDispatch)(AddMediaForm);
