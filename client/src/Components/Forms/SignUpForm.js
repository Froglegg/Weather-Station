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
    if (!this.validateEmail(this.state.email)) {
      alert("Please enter a valid email address");
    } else {
      const response = await api.createUser(this);
      if (response.err) {
        alert(response.err);
      } else if (response.token) {
        Cookies.set("userToken", response.token);
        alert(response.message);
        window.location.replace("/");
      } else {
        alert(response.message);
      }
    }
  };

  validateEmail = email => {
    //eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
            placeholder="Enter email address"
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
