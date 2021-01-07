import React from "react";
import { Input, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import PollList from "./poll_List";
import PollForm from "../poll_Form";

class Sidebar extends React.Component {
  state = {
    openModal: false,
  };
  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };
  render() {
    return (
      <div style={{ background: "#efefef", padding: "20px" }}>
        <div className="d-flex mb-5">
          <Input
            type="search"
            value={this.props.searchTerm}
            onChange={(e) => this.props.handleSearch(e.target.value)}
            placeholder="Search"
          />
          <Button color="success" className="ml-2" onClick={this.toggleModal}>
            New
          </Button>
        </div>
        <h3>List of Poll</h3>
        <hr />
        <PollList polls={this.props.polls} selectPoll={this.props.selectPoll} />
        <Modal
          unmountOnClose={true}
          isOpen={this.state.openModal}
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal}>Create New Item</ModalHeader>
          <ModalBody>
            <PollForm submit={this.props.addNewPoll} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default Sidebar;
