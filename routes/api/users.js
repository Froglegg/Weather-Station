const router = require("express").Router();
const users = require("../../controllers/users");
const db = require("../../db/config"); // importing the knex db config and function
router.get("/users", (req, res) => users.getTableData(req, res, db));
router.get("/users/:id", (req, res) => users.getRowData(req, res, db));
router.post("/users", (req, res) => users.postTableData(req, res, db));
router.put("/users/:id", (req, res) => users.putTableData(req, res, db));
router.delete("/users/:id", (req, res) => users.deleteTableData(req, res, db));

module.exports = router;
