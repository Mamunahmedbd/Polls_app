import React from "react";

import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  CustomInput,
  Label,
  Button,
} from "reactstrap";

class ParticipateForm extends React.Component {
  state = {
    name: "",
    selectedOption: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { errors, isValid } = this.validate();

    if (isValid) {
      this.props.getOpinion({
        pollId: this.props.poll.id,
        name: this.state.name,
        selectedOption: this.state.selectedOption,
      });
      event.target.reset();
      this.setState({
        name: "",
        selectedOption: "",
        errors: {},
      });
    } else {
      this.setState({ errors });
    }
  };
  validate = () => {
    const errors = {};
    if (!this.state.name) {
      errors.name = "Please Provide A name";
    } else if (this.state.name.length > 100) {
      errors.name = "Name is too short";
    }

    if (!this.state.selectedOption) {
      errors.selectedOption = "Please Select a value";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="d-flex">
          <h4>Opinion</h4>
          <Button
            color="warning"
            type="button"
            className="ml-auto"
            onClick={this.props.toggleModal}
          >
            Edit
          </Button>
          <Button
            type="button"
            className="ml-2"
            onClick={() => this.props.deletePoll(this.props.poll.id)}
          >
            Delete
          </Button>
        </div>
        {this.props.poll.options.map((opt) => (
          <FormGroup className="my-2 d-flex" key={opt.id}>
            <Label>
              <CustomInput
                type="radio"
                id={opt.id}
                name="selectedOption"
                value={opt.id}
                onChange={this.handleChange}
                invalid={this.state.errors.selectedOption ? true : false}
              />
            </Label>
            {opt.value}
            <span
              style={{
                padding: "5px 20px",
                background: "green",
                color: "white",
                borderRadius: "5px",
              }}
              className="ml-auto"
            >
              {opt.vote}
            </span>
            <span
              style={{
                padding: "5px",
                background: "orange",
                color: "white",
                borderRadius: "5px",
              }}
              className="ml-2"
            >
              {this.props.poll.totalVote > 0
                ? ((100 * opt.vote) / this.props.poll.totalVote).toFixed(2)
                : 0}
              %
            </span>
          </FormGroup>
        ))}
        <FormGroup>
          <Label>Enter Your name</Label>
          <Input
            name="name"
            placeholder="Mamun Ahmed"
            value={this.state.value}
            onChange={this.handleChange}
            invalid={this.state.errors.name ? true : false}
          />
          {this.state.errors.name && (
            <FormFeedback>{this.state.errors.name}</FormFeedback>
          )}
        </FormGroup>
        <Button type="submit">Submit Your Opinion</Button>
      </Form>
    );
  }
}
export default ParticipateForm;
