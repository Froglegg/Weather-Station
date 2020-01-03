import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    serverResponse: "",
    users: "",
    weatherData: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    this.queryServer();
  }

  queryUsers = async () => {
    const response = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    console.log(body);
    this.setState({ users: body });
  };

  queryWeather = async () => {
    const request = await fetch("/api/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ locality: "santa + cruz", country: "ES" })
    });
    const response = await request.json();
    console.log(response);
    // this.setState({ weatherData: body });
  };

  queryServer = async () => {
    const response = await fetch(`/api/hello`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    this.setState({ serverResponse: body.express });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.serverResponse}</p>

          <button onClick={this.queryUsers}>query users</button>
          <p>Response from DB: {this.state.userResponse}</p>

          <button onClick={this.queryWeather}>query weather api</button>
          <p>Response from DB: {this.state.weatherData}</p>
        </header>
      </div>
    );
  }
}

export default App;
