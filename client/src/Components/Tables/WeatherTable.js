import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import api from "../../Utils/api";
class WeatherTable extends Component {
  state = {};

  dataState = this.props.getDataState();

  componentDidMount() {
    this.dataState = this.props.getDataState();
  }

  render() {
    const weather = (
      <tr>
        <td>{this.dataState.currentSummary}</td>
        <td>{this.dataState.minutelySummary}</td>
        <td>{this.dataState.hourlySummary}</td>
        <td>{this.dataState.dailySummary}</td>
      </tr>
    );

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Currently</th>
            <th>Minutely</th>
            <th>Hourly</th>
            <th>Daily</th>
          </tr>
        </thead>
        <tbody>{weather}</tbody>
      </Table>
    );
  }
}

export default WeatherTable;
