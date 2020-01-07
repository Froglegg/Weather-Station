import React, { Component } from "react";
import { Table } from "reactstrap";
class WeatherTable extends Component {
  state = {};

  componentDidMount() {
    // this.dataState = this.props.getDataState();
  }

  render() {
    const weather = (
      <tr>
        <td>{this.props.currently}</td>
        <td>{this.props.minutely}</td>
        <td>{this.props.hourly}</td>
        <td>{this.props.daily}</td>
      </tr>
    );

    return (
      <Table responsive>
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
