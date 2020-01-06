const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const cors = require("cors"); // allows/disallows cross-site communication
const corsOptions = require("./corsOptions");
const morgan = require("morgan"); // logs requests, use "tiny" or "combined"
const routes = require("./routes"); // api routes
// const session = require("express-session");
// const redis = require("redis");
// const redisClient = redis.createClient();
// const redisStore = require("connect-redis")(session);

// redisClient.on("error", err => {
//   console.log("Redis error: ", err);
// });
// Define middleware here
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("combined"));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     name: "weather station cookie",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//     store: new redisStore({
//       host: "localhost",
//       port: 6379,
//       client: redisClient,
//       ttl: 86400
//     })
//   })
// );

// Define routes here
app.use(routes);

// API calls
app.get("/api/hello", async (req, res) => {
  res.send({ express: "Hello From Express hey", session: req.session });
});

// NODE_ENV is a heroku config
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
