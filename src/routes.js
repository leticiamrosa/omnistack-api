const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

// Controllers
const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const BookingController = require("./controllers/BookingController");
const DashboardController = require("./controllers/DashboardController");

// Express Router
const routes = express.Router();
const upload = multer(uploadConfig);

// Routes
routes.get("/", (req, res) => {
  res.status(400).json({ status: "API no ar" });
});

routes.post("/sessions", SessionController.store);

routes.get("/spots", SpotController.index);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

routes.get("/dashboard", DashboardController.show);

routes.post("/spots/:id/bookings", BookingController.store);
module.exports = routes;
