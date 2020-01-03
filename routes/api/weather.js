const router = require("express").Router();
const weather = require("../../controllers/weather");
// const db = require("../../db/config"); // importing the knex db config and function
router.post("/weather", (req, res) => weather.getData(req, res));

module.exports = router;
