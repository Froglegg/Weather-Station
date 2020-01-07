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
        <td>
          <p>{this.props.currently}</p>
        </td>
        <td>
          <p>{this.props.minutely}</p>
        </td>
        <td>
          <p>{this.props.hourly}</p>
        </td>
        <td>
          <p>{this.props.daily}</p>
        </td>
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
