import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import api from "../../Utils/api";
class LocationsTable extends Component {
  state = {};

  getData = async (country, locality) => {
    this.props.loadingData(true);
    const data = await api.queryWeather(country, locality);
    this.props.loadingData(false);
    this.props.addDataToState(data, country, locality);
  };

  deleteLocation = id => {
    api
      .deleteLocation(id, () => {
        this.props.deleteLocationFromState(id);
      })
      .catch(err => console.log(err));
  };

  render() {
    let locations;
    if (this.props.locations.length) {
      locations = this.props.locations.map(location => {
        return (
          <tr key={location.id}>
            <td>{location.country}</td>
            <td>{location.locality.split("+").join(" ")}</td>
            <td>
              <Button
                color="success"
                onClick={() =>
                  this.getData(location.country, location.locality)
                }
              >
                See Data
              </Button>
            </td>
            <td>
              <div>
                <Button
                  color="danger"
                  onClick={() => this.deleteLocation(location.id)}
                >
                  Del
                </Button>
              </div>
            </td>
          </tr>
        );
      });
    } else {
      locations = "";
    }

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Country</th>
            <th>Locality</th>
            <th>Weather data</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{this.props.locations.length ? { locations } : ""}</tbody>
      </Table>
    );
  }
}

export default LocationsTable;
