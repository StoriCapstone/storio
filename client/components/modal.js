import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom'

export default class Modaly extends React.Component {
  state = {
    open: true,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>

        <Modal open={open} onClose={this.onCloseModal} little styles={{ modal: { borderRadius: '1vw' } }}>
          <div id='modalContainer'>
            <h2>You must be logged in to begin recording!</h2>
            <div id='loginOrSignup'>
              <Link className='loginOrSignup' to='/login'>Login</Link>
              <div>or</div>
              <Link className='loginOrSignup' to='/signup'>Sign up</Link>
            </div>
          </div>
        </Modal >
      </div >
    )
  }
}

