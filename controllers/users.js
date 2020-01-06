const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const getTableData = (req, res, db) => {
  db.select("*")
    .from("users")
    .then(items => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

const getRowData = (req, res, db, cb) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

const createUser = (req, res, db) => {
  const { userName, email, hobby } = req.body;
  // const locations = JSON.stringify(req.body.locations);
  db.select("*")
    .from("users")
    .where({ email })
    .then(async item => {
      if (item.email) {
        res.json({ emailExists: "true" });
      } else {
        await bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            let password = hash;
            db("users")
              .insert({
                userName,
                email,
                password,
                hobby
              })
              .returning("*")
              .then(dbUser => {
                jwt.sign(
                  { id: dbUser[0].id },
                  JWT_SECRET,
                  { expiresIn: 36000 },
                  (err, token) => {
                    let obj = {
                      token,
                      message: `Welcome to Weather Station!`,
                      success: true
                    };
                    res.json(obj);
                  }
                );
              })
              .catch(err => res.status(400).json({ dbError: err }));
          });
        });
      }
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

const login = async (req, res, db) => {
  const { email, password } = req.body;

  db.select("*")
    .from("users")
    .where({ email })
    .then(async user => {
      await bcrypt
        .compare(password, user[0].password)
        .then(match => {
          if (match) {
            jwt.sign(
              { id: user[0].id },
              JWT_SECRET,
              { expiresIn: 36000 },
              (err, token) => {
                let obj = {
                  message: "Let's get started!",
                  token,
                  isAuthed: true
                };
                res.json(obj);
                // cb(obj);
              }
            );
          } else {
            res.json({
              message: "Incorrect credentials",
              isAuthed: false
            });
          }
        })
        .catch(err => res.json({ error: "problem with encryption", err: err }));
    })
    .catch(err =>
      res.status(400).json({
        message: "DB error, user with that email doesn't exist",
        err: err
      })
    );
};

const putTableData = (req, res, db) => {
  const { id } = req.params;
  const { userName, email, password, hobby } = req.body;
  db("users")
    .where({ id })
    .update({ userName, email, password, hobby })
    .returning("*")
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

const deleteTableData = (req, res, db) => {
  const { id } = req.params;
  db("users")
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: "true" });
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

module.exports = {
  getTableData,
  getRowData,
  createUser,
  login,
  putTableData,
  deleteTableData
};
