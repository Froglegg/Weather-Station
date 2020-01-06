import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./Utils/PrivateRoute";
import { getSession } from "./Utils/session";
import "./App.css";

import LogIn from "./Views/LogIn";
import SignUp from "./Views/SignUp";
import Dashboard from "./Views/Dashboard";
import NoMatch from "./Views/NoMatch";

class App extends Component {
  state = {
    session: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    let obj = getSession();
    if (obj) {
      this.setState({ session: obj.id });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/LogIn" component={LogIn} />
            <Route exact path="/SignUp" component={SignUp} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
