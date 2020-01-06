import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { CountryDropdown } from "react-country-region-selector";
import api from "../../Utils/api";
import { PushSpinner } from "react-spinners-kit";

class AddWeatherLocation extends Component {
  state = { country: "", locality: "", user: this.props.user, loading: false };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectCountry(val) {
    this.setState({ country: val });
  }

  addWeatherLocation = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const addLocation = await api.addLocation(this);
    this.setState({ loading: false });
    if (addLocation.err) {
      alert(`Error! ${addLocation.err}`);
    } else {
      this.props.toggle();
      let obj = {
        user: this.props.user,
        country: this.state.country,
        locality: this.state.locality.split(" ").join("+")
      };
      this.props.addLocationToState(obj);
    }
  };

  componentDidMount() {}

  render() {
    return (
      <Form onSubmit={this.addWeatherLocation}>
        <FormGroup>
          <Label for="userName">Select Country</Label>
          <CountryDropdown
            value={this.state.country}
            valueType={"short"}
            onChange={val => this.selectCountry(val)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Type in a city or town</Label>
          <Input
            type="text"
            name="locality"
            id="locality"
            onChange={this.onChange}
            value={this.state.locality === null ? "" : this.state.locality}
          />
        </FormGroup>
        {this.state.loading ? (
          <PushSpinner size={30} color="#686769" loading={this.state.loading} />
        ) : (
          <Button>Submit</Button>
        )}
      </Form>
    );
  }
}

export default AddWeatherLocation;
