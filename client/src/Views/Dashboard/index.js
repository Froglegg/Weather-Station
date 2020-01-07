import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import LocationsTable from "../../Components/Tables/LocationsTable";
import WeatherTable from "../../Components/Tables/WeatherTable";
import AddLocationModal from "../../Components/Modals/AddLocationModal";
import { logOut } from "../../Utils/session";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { PushSpinner } from "react-spinners-kit";
import WeatherComponent from "../../Components/Icons/Icons";
import api from "../../Utils/api";

import "./style.css";

class Dashboard extends Component {
  state = {
    locations: [],
    user: "",
    currentLocation: "",
    loading: false,
    icon: "",
    data: false
  };

  addLocationToState = async location => {
    this.setState(prevState => ({
      locations: [...prevState.locations, location]
    }));
  };

  deleteLocationFromState = id => {
    const updatedlocations = this.state.locations.filter(
      location => location.id !== id
    );
    this.setState({ locations: updatedlocations });
  };

  // passes data from weather api, up from the locations table child component props after clicking the get data button... a callback function, basically
  addDataToState = (data, country, locality) => {
    const { currently, minutely, hourly, daily } = data[0];
    const icon = data[0].currently.icon;
    this.setState({
      data: true,
      currently: currently ? currently.summary : "",
      minutely: minutely ? minutely.summary : "",
      hourly: hourly ? hourly.summary : "",
      daily: daily ? daily.summary : "",
      currentLocation: `${locality}, ${country}`,
      icon: icon ? icon : ""
    });
  };

  // async spinner to pass down through props to locations table
  loadingData = loading => {
    if (loading === true) {
      this.setState({ loading: true });
    } else {
      this.setState({ loading: false });
    }
  };

  async componentDidMount() {
    let userId = await jwt_decode(Cookies.get("userToken")).id;
    this.setState({ user: userId });
    let response = await api.queryUserLocations(userId);
    this.setState({ locations: response });
  }

  render() {
    return (
      <Container className="Dashboard h-100">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>Weather Station</h1>
          </Col>
          <Col className="text-right">
            <Link
              to="/"
              className={"btn btn-warning"}
              onClick={() => {
                logOut();
              }}
              style={{ margin: "20px 0" }}
            >
              <div className="NavLinks">Log Out</div>
            </Link>
          </Col>
        </Row>
        <Row className="mt-2 justify-items-center align-items-center">
          <Col className="col-xs-12 text-center">
            {this.state.currentLocation && !this.state.loading ? (
              <div>
                <h3>
                  Weather Data for{" "}
                  {this.state.currentLocation.split("+").join(" ")}
                </h3>
              </div>
            ) : (
              ""
            )}
            {this.state.loading ? (
              <PushSpinner
                size={30}
                color="#686769"
                loading={this.state.loading}
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
        {this.state.data ? (
          <Row>
            <Col className="col-xs-12 text-center mt-2">
              <Col className="col-xs-12 mt-1 text-center">
                <div style={{ fontSize: "44px" }} className="weatherIcon">
                  <WeatherComponent icon={this.state.icon} />
                </div>
              </Col>

              <WeatherTable
                currently={this.state.currently ? this.state.currently : ""}
                minutely={this.state.minutely ? this.state.minutely : ""}
                hourly={this.state.hourly ? this.state.hourly : ""}
                daily={this.state.daily ? this.state.daily : ""}
              />
            </Col>
          </Row>
        ) : (
          ""
        )}

        <Row>
          <Col className="col-xs-12 mt-2">
            <h3 className="">Locations</h3>
            <div style={{ margin: "15px 0px 15px 0px" }}>
              <AddLocationModal
                user={this.state.user}
                addLocationToState={this.addLocationToState}
              />
            </div>
            {this.state.locations ? (
              <LocationsTable
                addDataToState={this.addDataToState}
                loadingData={this.loadingData}
                user={this.state.user}
                locations={this.state.locations}
                deleteLocationFromState={this.deleteLocationFromState}
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
