import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Link, } from 'react-router-dom'
import  AddMediaForm  from '../addMediaForm'
export default class Modaly extends React.Component {
  state = {
    open: true,
  };

  onOpenModal = () => {
    this.setState({ open: true, });
    // this.props.status = false
    // this.props.parent.forceUpdate()

  };

  onCloseModal = () => {
    this.setState({ open: false, });
     this.props.parent.setState({isAdding: false, })
  };

  render() {
    const { open, } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} little styles={{ modal: { borderRadius: '1vw', }, }}>
          <div >
            <AddMediaForm />
          </div>
        </Modal >
      </div >
    )
  }
}

