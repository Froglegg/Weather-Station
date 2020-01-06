const router = require("express").Router();
const userRoutes = require("./api/users");
const weatherRoutes = require("./api/weather");

// API Routes
router.use("/api", userRoutes);
router.use("/api", weatherRoutes);

module.exports = router;
