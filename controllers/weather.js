const axios = require("axios").default;
require("dotenv").config();
const DARK_API = process.env.DARK_API;
const GOOGLE_API = process.env.GOOGLE_API;

const getData = (req, res) => {
  console.log(req.body);
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?components=locality:${req.body.locality}|country:${req.body.country}&key=${GOOGLE_API}`
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

const getLocations = (req, res, db) => {
  db.select("*")
    .from("locations")
    .then(items => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

const getUserLocations = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("locations")
    .where({ user: id })
    .then(items => {
      if (items) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

const postLocation = (req, res, db) => {
  const { user, country, locality } = req.body;
  db("locations")
    .insert({ user, country, locality })
    .returning("*")
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const deleteLocation = (req, res, db) => {
  const { id } = req.params;
  db("locations")
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: "true" });
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

module.exports = {
  getLocations,
  getUserLocations,
  postLocation,
  getData,
  deleteLocation
};
