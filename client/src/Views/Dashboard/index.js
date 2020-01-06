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

  addLocationToState = async location => {
    // let state = await this.state.locations;
    console.log(location);
    console.log(this.state.locations);
    // this.setState({ locations: this.state.locations.concat(location) });
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
    if (!data.length || !data) {
      dataState.currentSummary = "No weather data found!";
    } else {
      if (data[0].currently) {
        dataState.currentSummary = data[0].currently.summary;
        dataState.currentIcon = data[0].currently.icon;
      }

      if (data[0].minutely) {
        dataState.minutelySummary = data[0].minutely.summary;
        dataState.minutelyIcon = data[0].minutely.icon;
      }

      if (data[0].hourly) {
        dataState.hourlySummary = data[0].hourly.summary;
        dataState.hourlyIcon = data[0].hourly.icon;
      }

      if (data[0].daily) {
        dataState.dailySummary = data[0].daily.summary;
        dataState.dailyIcon = data[0].daily.icon;
      }
    }

    dataState = JSON.stringify(dataState);

    this.setState({
      data: dataState,
      currentLocation: `${locality}, ${country}`,
      icon: data[0].currently.icon
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
    let userId = await jwt_decode(Cookies.get("userToken"));
    userId = userId.id;
    console.log(userId);
    this.setState({ user: userId });
    let response = await api.queryUserLocations(userId);
    this.setState({ locations: response });
  }

  getDataState = () => {
    const obj = JSON.parse(this.state.data);
    return obj;
  };

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

              <WeatherTable getDataState={this.getDataState} />
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
