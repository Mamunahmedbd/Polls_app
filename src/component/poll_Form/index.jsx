import React from "react";
import shortid from "shortid";
import MyForm from "./form";
const defaultOption = [
  { id: shortid.generate(), value: "", vote: 0 },
  { id: shortid.generate(), value: "", vote: 0 },
];

class PollForm extends React.Component {
  state = {
    title: "",
    description: "",
    options: defaultOption,
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount() {
    const { poll } = this.props;
    if (poll && Object.keys(poll).length > 0) {
      this.setState({
        title: poll.title,
        description: poll.description,
        options: poll.options,
      });
    }
  }
  handleOptionChange = (event, index) => {
    const options = [...this.state.options];
    options[index].value = event.target.value;
    this.setState({ options });
  };

  createOptions = () => {
    const { options } = this.state;
    if (options.length < 5) {
      options.push({
        id: shortid.generate(),
        vote: 0,
        value: "",
      });
      this.setState({ options });
    } else {
      alert("You can create ma 5 Options");
    }
  };

  deleteOption = (index) => {
    const { options } = this.state;
    if (options.length > 0) {
      options.slice(index, 1);
    }
    this.setState({ options });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, errors } = this.validate();
    if (isValid) {
      // const { title, description, options } = this.state;
      const poll = {
        title: this.state.title,
        description: this.state.description,
        options: this.state.options,
      };
      if (this.props.isUpdate) {
        poll.id = this.props.poll.id;
        this.props.submited(poll);
        alert("Update successfully");
      } else {
        this.props.submit(poll);
        event.target.reset();
        this.setState({
          title: "",
          description: "",
          options: defaultOption,
          errors: {},
        });
      }
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    const errors = {};
    const { title, description, options } = this.state;
    if (!title) {
      errors.title = "Please Provide A Title";
    } else if (title.length < 20) {
      errors.title = "Please Provide minimum 20 charactar";
    } else if (title.length > 100) {
      errors.title = "Title is too long";
    }

    if (!description) {
      errors.description = "Please Provide A description";
    } else if (description.length > 500) {
      errors.description = "Description too long";
    }

    const optionErrors = [];

    options.forEach((opt, index) => {
      if (!opt.value) {
        optionErrors[index] = "Option Text Empty";
      } else if (opt.value.length > 100) {
        optionErrors[index] = "Option description is too short";
      }
    });
    if (optionErrors.length > 0) {
      errors.options = optionErrors;
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    const { title, description, options, errors } = this.state;
    return (
      <MyForm
        title={title}
        description={description}
        options={options}
        errors={errors}
        buttonValue={this.props.buttonValue || "Create Poll"}
        handleChange={this.handleChange}
        handleOptionChange={this.handleOptionChange}
        createOption={this.createOptions}
        deleteOption={this.deleteOption}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
export default PollForm;
