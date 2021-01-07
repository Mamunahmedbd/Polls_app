import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";

const MyForm = ({
  title,
  description,
  options,
  errors,
  buttonValue,
  handleChange,
  handleOptionChange,
  createOption,
  deleteOption,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          name="title"
          id="title"
          placeholder="Mamun Ahmed"
          value={title}
          onChange={handleChange}
          invalid={errors.title ? true : false}
        />
        {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          name="description"
          id="description"
          placeholder="description"
          value={description}
          onChange={handleChange}
          invalid={errors.description ? true : false}
        />
        {errors.description && (
          <FormFeedback>{errors.description}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label>
          Enter Option
          <Button
            className="btn btn-success"
            onClick={createOption} //! Just One click Create A new Input
          >
            Add Option
          </Button>
        </Label>
        {options.map((opt, index) => (
          <div className="d-flex" key={opt.id}>
            <Input
              value={opt.value}
              className="my-2"
              onChange={(e) => handleOptionChange(e, index)}
              invalid={errors.options && errors.options[index] ? true : false}
            />
            <Button
              color="danger"
              onClick={() => deleteOption(index)}
              className="my-2 ml-2"
            >
              Delete
            </Button>
          </div>
        ))}
      </FormGroup>
      <Button color="primary" type="submit">
        {buttonValue}
      </Button>
    </Form>
  );
};

export default MyForm;
