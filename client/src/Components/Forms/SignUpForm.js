import React, { Component } from "react";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class SignUpForm extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    hobby: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = e => {
    e.preventDefault();
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,

        hobby: this.state.hobby
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          this.props.addItemToState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {}

  render() {
    return (
      <Form onSubmit={this.submitFormAdd}>
        <FormGroup>
          <Label for="userName">Username</Label>
          <Input
            type="text"
            name="userName"
            id="userName"
            onChange={this.onChange}
            value={this.state.userName === null ? "" : this.state.userName}
            placeholder="Create username"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            onChange={this.onChange}
            value={this.state.email === null ? "" : this.state.email}
            placeholder="Enter (any) email address"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="text"
            name="password"
            id="password"
            onChange={this.onChange}
            value={this.state.password === null ? "" : this.state.password}
            placeholder="Create password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Hobby</Label>
          <Input
            type="text"
            name="hobby"
            id="hobby"
            onChange={this.onChange}
            value={this.state.hobby === null ? "" : this.state.hobby}
            placeholder="What is your hobby?"
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default SignUpForm;
