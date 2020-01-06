import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Cookies from "js-cookie";
import api from "../../Utils/api";
class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    isAuthed: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitLogin = async event => {
    event.preventDefault();
    const response = await api.login(this);
    // return response;
    if (response.token) {
      Cookies.set("userToken", response.token);
    }
    if (response.isAuthed === true) {
      alert(response.message);
      window.location.replace("/");
    } else {
      alert(response.message);
    }
  };

  componentDidMount() {}

  render() {
    return (
      <Form onSubmit={this.submitLogin}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            onChange={this.onChange}
            value={this.state.email === null ? "" : this.state.email}
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
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default LoginForm;
