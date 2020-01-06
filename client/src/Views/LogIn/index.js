import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import LoginForm from "../../Components/Forms/LoginForm";
import "./style.css";

class Login extends Component {
  render() {
    return (
      <Container className="Login">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>Weather Station</h1>
            <h2 style={{ margin: "20px 0" }}>Login</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <LoginForm />
          </Col>
        </Row>
        <Row>
          <Col>
            <br></br>
            <p>
              Don't have an account?
              <Link to="/SignUp" className={"App-link"} onClick={() => {}}>
                &nbsp; Click here to sign up!
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
