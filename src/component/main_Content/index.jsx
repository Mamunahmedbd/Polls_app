import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ParticipateForm from "./participate";
import MyForm from "../poll_Form";

class MainContent extends React.Component {
  state = {
    openModal: false,
  };
  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  render() {
    if (Object.keys(this.props.poll).length === 0) {
      return (
        <div>
          <h3>Welcome to My Application</h3>
          <p>
            You can create as many poll as you want. click the new button to
            create a new poll. To check details of a poll please select from the
            left sidebar. By selecting a poll you can check it's details,
            participate and check others opinion about this poll
          </p>
        </div>
      );
    }
    const { poll, getOpinion, updatePoll, deletePoll } = this.props;
    return (
      <div>
        <h3>{poll.title}</h3>
        <p>{poll.description}</p>
        <hr />
        <ParticipateForm
          poll={poll}
          getOpinion={getOpinion}
          toggleModal={this.toggleModal}
          deletePoll={deletePoll}
        />
        <div>
          <Modal
            isOpen={this.state.openModal}
            toggle={this.toggleModal}
            unmountOnClose={true}
          >
            <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
            <ModalBody>
              <MyForm
                poll={poll}
                isUpdate={true}
                submited={updatePoll}
                buttonValue="Update Form"
              />
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}
export default MainContent;
