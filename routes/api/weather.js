const router = require("express").Router();
const weather = require("../../controllers/weather");
const db = require("../../db/config");

// route for getting location coordinates from google maps api and weather information from dark sky
router.post("/weather", (req, res) => weather.getData(req, res));

// routes for getting locations that have Users ID as foreign key
router.get("/locations", (req, res) => weather.getLocations(req, res, db));
router.get("/locations/:id", (req, res) =>
  weather.getUserLocations(req, res, db)
);
router.post("/locations", (req, res) => weather.postLocation(req, res, db));
router.delete("/locations/:id", (req, res) =>
  weather.deleteLocation(req, res, db)
);

module.exports = router;
