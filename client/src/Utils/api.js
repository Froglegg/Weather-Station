export default {
  createUser: async localState => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: localState.state.email,
        password: localState.state.password,
        userName: localState.state.userName,
        hobby: localState.state.hobby
      })
    });

    const body = await response.json();
    return body;
  },

  login: async localState => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: localState.state.email,
        password: localState.state.password
      })
    });

    const body = await response.json();
    return body;
  },

  queryUsers: async (localState, id) => {
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    console.log(body);
    localState.setState({ user: body });
  },

  queryUserLocations: async id => {
    const response = await fetch(`/api/locations/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    let body = await response.json();

    return body;
  },

  queryWeather: async (country, locality) => {
    const request = await fetch("/api/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        country: country,
        locality: locality
      })
    });
    const response = await request.json();
    return response;
    // localState.setState({ weatherData: response });
  },

  addLocation: async localState => {
    const request = await fetch("/api/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: localState.state.user,
        country: localState.state.country,
        locality: localState.state.locality.split(" ").join("+")
      })
    });
    const response = await request.json();
    return response;
  },

  deleteLocation: async (id, cb) => {
    const request = await fetch(`/api/locations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();
    console.log(response);
    cb();
  },

  testServer: async localState => {
    const response = await fetch(`/api/hello`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    localState.setState({ serverResponse: body.express });
  }
};
