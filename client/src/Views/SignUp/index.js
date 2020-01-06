import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import SignUpForm from "../../Components/Forms/SignUpForm";
import "./style.css";

class SignUp extends Component {
  render() {
    return (
      <Container className="SignUp">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>Weather Station</h1>
            <h2 style={{ margin: "20px 0" }}>Sign Up</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <SignUpForm />
          </Col>
        </Row>
        <Row>
          <Col>
            <br></br>
            <p>
              Already have an account?
              <Link to="/" className={"App-link"} onClick={() => {}}>
                &nbsp; Login!
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignUp;
