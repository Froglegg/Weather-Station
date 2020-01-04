const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).json({
      message: "No token, authorization denied."
    });
  } else {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (e) {
      res.status(400).json({ message: "Token is invalid." });
    }
  }
};

module.exports = auth;
