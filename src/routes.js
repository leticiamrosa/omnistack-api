const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

// Controllers
const AuthController = require("./controllers/AuthController");
const SpotController = require("./controllers/SpotController");
const BookingController = require("./controllers/BookingController");
const DashboardController = require("./controllers/DashboardController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

// routes.use(middleware);

// Express Router
const routes = express.Router();
const middleware = require("./middlewares/auth");
const upload = multer(uploadConfig);

// routes.use(middleware);
// Routes
routes.get("/", (req, res) => {
  res.status(400).json({ status: "API no ar" });
});

routes.post("/auth", AuthController.auth);
routes.post("/users/create", AuthController.store);

routes.post("/users/forgot_password", AuthController.update);

routes.get("/spots", SpotController.index);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

routes.get("/dashboard", DashboardController.show);

routes.post("/spots/:id/bookings", BookingController.store);

routes.post("/bookings/:booking_id/approvals", ApprovalController.store);
routes.post("/bookings/:booking_id/rejections", RejectionController.store);

module.exports = routes;
