import React from 'react';
import Modal from 'react-responsive-modal';
import CheckboxComponent from "./checkboxcomponent"

export default class Modalview extends React.Component {
  state = {
    open: false,
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
        <button onClick={this.onOpenModal}>Analysis options</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h1>Analysis options</h1>
          <CheckboxComponent checkboxText="Test" />
        </Modal>
      </div>
    );
  }
}
