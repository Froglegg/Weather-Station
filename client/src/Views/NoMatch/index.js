import React from "react";
import { Container, Row, Col } from "reactstrap";

import "./style.css";

function NoMatch() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>404 Page Not Found</h1>
          <h2>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h2>
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
