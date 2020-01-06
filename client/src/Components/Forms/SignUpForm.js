import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Cookies from "js-cookie";
import api from "../../Utils/api";

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

  submitFormAdd = async e => {
    e.preventDefault();
    const response = await api.createUser(this);
    if (response.token) {
      Cookies.set("userToken", response.token);
      alert(response.message);

      window.location.replace("/");
    } else {
      alert(response.message);
    }
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
