import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Link, } from 'react-router-dom'

export default class Modaly extends React.Component {
  state = {
    open: true,
  };

  onOpenModal = () => {
    this.setState({ open: true, });
  };

  onCloseModal = () => {
    this.props.parent.setState({ isAdding: false, })
    this.setState({ open: false, });
  };

  render() {
    const { open, } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} little styles={{ modal: { borderRadius: '1vw', }, }}>
          <div id="modalContainer">
            <h2>Create New Group:</h2>
            <form onSubmit={(evt) => {
              let newGroup = {
                name: evt.target.nameField.value,
                isPublic: evt.target.publicVsPrivate.value,
                thumbnailUrl: evt.target.thumbnailUrl.value,
                briefDescription: evt.target.desc.value,
              }

              props.handleSubmit(newGroup)
            }}>
              <input type="text" name="nameField" required placeholder="Name" />
              <input type="text" name="desc" placeholder="Brief description" />
              <br />
              <div>Private</div>
              <input name="publicVsPrivate" type="radio" value="false" checked />
              <div>Public</div>
              <input name="publicVsPrivate" type="radio" value="true" />
              <div>Thumbnail photo</div>
              {/*  <input name = 'thumbnailFile' type='file' /> how to make this work with amazon???
              <div>or</div>*/}
              <input type="text" name="thumbnailUrl" placeholder="Enter URL" />
              <button type="submit" >Done</button>
            </form>

          </div>
        </Modal >
      </div >
    )
  }
}

