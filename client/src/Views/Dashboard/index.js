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
    data: "",
    currentLocation: "",
    loading: false,
    icon: ""
  };

  addLocationToState = location => {
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

  addDataToState = (data, country, locality) => {
    let dataState = { ...this.state.data };

    dataState.currentSummary = data[0].currently.summary;
    dataState.currentIcon = data[0].currently.icon;
    dataState.minutelySummary = data[0].minutely.summary;
    dataState.minutelyIcon = data[0].minutely.icon;
    dataState.hourlySummary = data[0].hourly.summary;
    dataState.hourlyIcon = data[0].hourly.icon;
    dataState.dailySummary = data[0].daily.summary;
    dataState.dailyIcon = data[0].daily.icon;

    dataState = JSON.stringify(dataState);
    // const currentSummary = data[0].currently.summary;
    // const currentIcon = data[0].currently.icon;
    // const minutelySummary = data[0].minutely.summary;
    // const minutelyIcon = data[0].minutely.icon;
    // const hourlySummary = data[0].hourly.summary;
    // const hourlyIcon = data[0].hourly.icon;
    // const dailySummary = data[0].daily.summary;
    // const dailyIcon = data[0].daily.icon;
    this.setState({
      data: dataState,
      currentLocation: `${locality}, ${country}`,
      icon: data[0].currently.icon
    });
  };

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
    api.queryUserLocations(this, userId);
  }

  getDataState = () => {
    const obj = JSON.parse(this.state.data);
    return obj;
  };

  render() {
    return (
      <Container className="Dashboard">
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
        <Row className="mt-2">
          <Col>
            {this.state.currentLocation && !this.state.loading ? (
              <div>
                <h3>Weather Data for {this.state.currentLocation}</h3>
              </div>
            ) : (
              ""
            )}{" "}
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
            <Col className="col-xs-12">
              <Col className="col-xs-12 m-2 text-center">
                <div style={{ fontSize: "44px" }}>
                  <WeatherComponent icon={this.state.icon} />
                </div>
              </Col>

              <WeatherTable getDataState={this.getDataState} />
            </Col>
          </Row>
        ) : (
          ""
        )}

        <Row>
          <Col className="col-xs-12 ">
            <Row>
              <Col className="text-left">
                <h3>Locations</h3>

                <AddLocationModal
                  user={this.state.user}
                  addLocationToState={this.addLocationToState}
                />
              </Col>
            </Row>
            <LocationsTable
              addDataToState={this.addDataToState}
              loadingData={this.loadingData}
              user={this.state.user}
              locations={this.state.locations}
              deleteLocationFromState={this.deleteLocationFromState}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
