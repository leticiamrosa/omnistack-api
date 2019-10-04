const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

// Controllers
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');

// Express Router
const routes = express.Router();
const upload = multer(uploadConfig);

// Routes
routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);


module.exports = routes;