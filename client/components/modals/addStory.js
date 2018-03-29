import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Link, } from 'react-router-dom'
import { connect, } from 'react-redux';
import { addBlobToS3, } from '../../utils';
import { postStory, } from '../../store';
import { selectMP3toEdit, } from '../../store/';
const genres = [
  'Crime',
  'Memorial',
  'History',
  'Family',
  'Scary',
  'Funny',
  'Educational',
];


 class Modaly extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    open: true,
    name: '',
    genre: '',
  };
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.submitAndEditCB = this.submitAndEditCB.bind(this);
  this.getSubmitObj = this.getSubmitObj.bind(this);
  this.handleSubmitAndEdit = this.handleSubmitAndEdit.bind(this);
}
  onOpenModal = () => {
    this.setState({ open: true, });
  };

  onCloseModal = () => {
    // this.props.parent.setState({isAdding: false, })
    this.setState({ open: false, });
    this.props.parent.setState({showModal:false})
  };
  handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    let isValid = false;

    this.setState({
      [name]: value,
      [name + 'Changed']: true,
      [name + 'IsValid']: isValid,
    });
  }
  submitAndEditCB(story) {
    this.props.selectMP3toEdit(this.props.storySrc, story);
    this.props.history.push('/addMediaForm');
  }
  async getSubmitObj() {
    const url = await addBlobToS3(this.props.storySrc, 'mp3');
    const submitObj = {
      url,
      genre: this.state.genre,
      name: this.state.name.trim(),
      mediaLength: Math.ceil(this.props.duration),
    };
    return submitObj;
  }
  handleSubmitAndEdit(evt) {
    evt.preventDefault();
    this.getSubmitObj().then(storyObj =>
      this.props.postStory(storyObj, this.submitAndEditCB)
    );
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.getSubmitObj().then(storyObj => this.props.postStory(storyObj));
  }

  render() {
    console.log('wavesurfer in the modal', this.props.wavesurfer)
    const { open, } = this.state;
    const nameId = 'name';
    const genreId = 'genre';
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} little styles={{ modal: { borderRadius: '1vw', }, }}>
          <div id="modalContainer addStory">
          <form onSubmit={this.handleSubmit}>


          <fieldset>
            <legend>Story Data</legend>
            <div>
              <label htmlFor={nameId}>
                Story Name:
                <input
                  id={nameId}
                  name={nameId}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.name}
                  required
                  autoComplete="off"
                  placeholder="Please enter a story Name"
                />
              </label>
              <label htmlFor={genreId}>
                Genre:
                <select
                  id={genreId}
                  name={genreId}
                  onChange={this.handleChange}
                  value={this.state.genre}
                  required
                >
                  <option value="" />
                  {genres.map(genre => <option key={genre}>{genre}</option>)}
                </select>
              </label>
            </div>
            <input type="submit" value="Submit" />
            <input
              type="submit"
              value="Submit and Edit"
              onClick={this.handleSubmitAndEdit}
            />
          </fieldset>
        </form>
          </div>
        </Modal >
      </div >
    )
  }
}

const mapState = null;
const mapDispatch = { postStory, selectMP3toEdit, };
export default connect(mapState, mapDispatch)(Modaly);
