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
    this.props.parent.setState({isAdding: false, })
    this.setState({ open: false, });
  };

  render() {
    const { open, } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} little styles={{ modal: { borderRadius: '1vw', }, }}>
          <div id="modalContainer">
            <div id="loginOrSignup">
            <Link className="loginOrSignup" to = "/recorder">Go to recorder</Link>
              <div>or</div>
              <Link className="loginOrSignup" to="/addMediaForm">Go straight to editor</Link>
            </div>
          </div>
        </Modal >
      </div >
    )
  }
}

