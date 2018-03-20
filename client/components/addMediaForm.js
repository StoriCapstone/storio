import React from 'react'
// import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { changeMediaEntryMethod } from '../store/addMediaForm';

// var testData = {storyId:1, media:[{
//     src: 'https://d3qi0qp55mx5f5.cloudfront.net/www/i/homepage/spotlight/urban-chicago-spotlight.jpg',
//     type: "img",
//     start: 0,
//     end: 15,
//     options: {caption: 'hi'}}]
//   }

const AddMediaForm = props => {
    return (

        <form onSubmit={props.handleSubmit} id="addMedia" className={props.show ? '' : 'hide'}>
        <input type="radio" defaultChecked onChange={props.handleFileOrUrlChange} name={'fileOrUrl'} value={'file'} id={'file'} />
        <label htmlFor="file">import file</label>
        <input type="radio" name={'fileOrUrl'} onChange={props.handleFileOrUrlChange} value={'url'} id={'url'} />
        <label htmlFor="url">url of media</label>
            {props.selectedOption === 'file' ?
                <fieldset form="addMedia">
                <label>Upload media</label>
                <input type="file" name={'file'} />
                </fieldset>
                 :
                 <fieldset form="addMedia">
                 <label>Url</label>
                 <input type="text" name={'src'} />
                 <label>select type</label>
                 <input type="radio" defaultChecked name={'type'} value={'img'} id={'type1'} />
                 <label htmlFor="type1">image</label>
                 <input type="radio" name={'type'} value={'video'} id={'type2'} />
                 <label htmlFor="type2">video</label>
                 </fieldset>
                }


            <label>start at:</label>
            <input type="number" value={props.time} name={'start'} />
            <label> Duration</label>
            <input type="number" name={'duration'} />
            <label> Caption (optional)</label>
            <input type="text" name={'caption'} />
            <label> Name of Media</label>
            <input type="text" name={'name'} />
            <button type="submit">Submit</button>
        </form>
    )
}

const mapState = (state) => ({
    selectedOption: state.addMediaForm.selectedOption,
    time: state.addMediaForm.time,
    show: state.waveform.toggleAddMediaForm,
})
const mapDispatch = (dispatch) => ({
    handleSubmit: event => {
        event.preventDefault()
        if (event.target.fileOrUrl.value === 'file'){
            console.log(event.target.file[1].files[0])
        }
        else if (event.target.fileOrUrl === 'url'){
            console.log({
                storyId: 1,
                media: [{src: event.target.src.value, type: event.target.type.value, start: (+event.target.start.value), end: (+event.target.start.value) + (+event.target.duration.value), options: {caption: event.target.caption.value, name: event.target.name.value}}]
            })
        }
    },
    handleFileOrUrlChange: event => {
        dispatch(changeMediaEntryMethod(event.target.value))
    }
})

export default connect(mapState, mapDispatch)(AddMediaForm);
