import React from 'react';
// import ReactDOM from 'react-dom'
import { connect, } from 'react-redux';
import { changeMediaEntryMethod, } from '../store/addMediaForm';
import { addMediaToStory, } from '../store/media';
import { addBlobToS3, } from '../utils';
import Axios from 'axios';

// var testData = {storyId:1, media:[{
//     src: 'https://d3qi0qp55mx5f5.cloudfront.net/www/i/homepage/spotlight/urban-chicago-spotlight.jpg',
//     type: "img",
//     start: 0,
//     end: 15,
//     options: {caption: 'hi'}}]
//   }

class AddMediaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = undefined;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    event.persist();
    const time = this.props.time;
    // console.log('event', event.nativeEvent)
    // var nativeEvent = event.nativeEvent;
    if (event.target.fileOrUrl.value === 'file') {
      let extension = event.target.file[1].files[0].name.split('.');
      extension = extension[extension.length - 1];
      console.log('extension', extension);
      addBlobToS3(event.target.file[1].files[0], extension).then(filename => {
          this.props.addMediaToStory({
            key: filename,
            mediaType: event.target.file[1].files[0].type,
            start: time,
            duration: +event.target.duration.value,
            caption: event.target.caption.value,
            name: event.target.name.value,
          }
        );
      });
    } else if (event.target.fileOrUrl === 'url') {
      if (event.target.type === 'img') {
        Axios.get(event.target.src.value)
          .then(res => res.data)
          .then(file => {
            let extension = event.target.src.value.split('.');
            extension = extension[extension.length - 1];
            return addBlobToS3(file, extension);
          })
          .then(filename => {
              this.props.addMediaToStory({
                key: filename,
                mediaType: event.target.type.value,
                start: time,
                duration: +event.target.duration.value,
                caption: event.target.caption.value,
                name: event.target.name.value,
              }
            );
          });
      } else {
          this.props.addMediaToStory({
            key: event.target.src.value,
            mediaType: event.target.type.value,
            start: time,
            duration: +event.target.duration.value,
            caption: event.target.caption.value,
            name: event.target.name.value,
          })
        ;
      }
    }
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        id="addMedia"
        className={this.props.show ? '' : 'hide'}
      >
        <input
          type="radio"
          defaultChecked
          onChange={this.props.handleFileOrUrlChange}
          name={'fileOrUrl'}
          value={'file'}
          id={'file'}
        />
        <label htmlFor="file">import file</label>
        <input
          type="radio"
          name={'fileOrUrl'}
          onChange={this.props.handleFileOrUrlChange}
          value={'url'}
          id={'url'}
        />
        <label htmlFor="url">url of media</label>
        {this.props.selectedOption === 'file' ? (
          <fieldset form="addMedia">
            <label>Upload media</label>
            <input type="file" name={'file'} />
          </fieldset>
        ) : (
          <fieldset form="addMedia">
            <label>Url</label>
            <input type="text" name={'src'} />
            <label>select type</label>
            <input
              type="radio"
              defaultChecked
              name={'type'}
              value={'img'}
              id={'type1'}
            />
            <label htmlFor="type1">image</label>
            <input type="radio" name={'type'} value={'video'} id={'type2'} />
            <label htmlFor="type2">video</label>
          </fieldset>
        )}

        <p>start at: {this.props.time.toFixed(2)}</p>
        <label> Duration</label>
        <input type="number" name={'duration'} />
        <label> Caption (optional)</label>
        <input type="text" name={'caption'} />
        <label> Name of Media</label>
        <input type="text" name={'name'} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapState = state => ({
  selectedOption: state.addMediaForm.selectedOption,
  time: state.addMediaForm.time,
  show: state.waveform.toggleAddMediaForm,
});
const mapDispatch = {
    handleFileOrUrl: changeMediaEntryMethod,
    addMediaToStory,
};

export default connect(mapState, mapDispatch)(AddMediaForm);
