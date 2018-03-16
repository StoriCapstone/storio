import React from 'react'
// import ReactDOM from 'react-dom'
import { connect } from 'react-redux';

// var testData = {storyId:1, media:[{
//     src: 'https://d3qi0qp55mx5f5.cloudfront.net/www/i/homepage/spotlight/urban-chicago-spotlight.jpg', 
//     type: "img",
//     start: 0,
//     end: 15,
//     options: {caption: 'hi'}}]
//   }

const AddMediaForm = props => {

    return (
        <form onSubmit={props.handleSubmit}>
            <label>Image Url</label>
            <input type="text" name={'src'}/>
            <label>select type</label>
            <input type="radio" name={'type'} value={"img"} id={'type1'} />
            <label for="type1">image</label>
            <input type="radio" name={'type'} value={"video"} id={'type2'} />
            <label for="type2">video</label>
            <label >start at:</label>
            <input type="number" name={'start'} />
            <label > Duration</label>
            <input type="number" name={'duration'} />
            <label > Caption (optional)</label>
            <input type="text" name={'caption'} />
            <button type="submit">Submit</button>
        </form>
    )
}

const mapState = null
const mapDispatch = (dispatch) => ({
    handleSubmit: event => {
        event.preventDefault()
        console.log({
            storyId: 1,
            media: [{src: event.target.src.value, type: event.target.type.value, start: (+event.target.start.value), end: (+event.target.start.value) + (+event.target.duration.value), options:{caption: event.target.caption.value}}]
        })
    }
})

export default connect(mapState, mapDispatch)(AddMediaForm);
