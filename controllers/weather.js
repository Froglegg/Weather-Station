const axios = require("axios").default;
require("dotenv").config();
const DARK_API = process.env.DARK_API;
const GOOGLE_API = process.env.GOOGLE_API;
const getData = (req, res) => {
  // console.log(req.body);
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?components=locality:santa+cruz|country:ES&key=${GOOGLE_API}`
    )
    .then(result => {
      let lat = result.data.results[0].geometry.location.lat;
      let lng = result.data.results[0].geometry.location.lng;
      axios
        .get(`https://api.darksky.net/forecast/${DARK_API}/${lat},${lng}`)
        .then(response => {
          if (response) {
            console.log(response.data);
            res.status(200).json([response.data]);
          } else {
            res.json({ dataExists: "false" });
          }
        })
        .catch(error => {
          console.log(error);
          res.status(400).json({ apiError: "api error" });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ apiError: "api error" });
    });
};

module.exports = {
  getData
};
