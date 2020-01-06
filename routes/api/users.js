const router = require("express").Router();
const users = require("../../controllers/users");
const db = require("../../db/config"); // importing the knex db config and function

require("dotenv").config();

router.get("/users", (req, res) => users.getTableData(req, res, db));
router.get("/users/:id", (req, res) => users.getRowData(req, res, db));
// create route
router.post("/users", (req, res) => users.createUser(req, res, db));
router.put("/users/:id", (req, res) => users.putTableData(req, res, db));
router.delete("/users/:id", (req, res) => users.deleteTableData(req, res, db));

//login route
router.post("/login", (req, res) => users.login(req, res, db));

module.exports = router;
