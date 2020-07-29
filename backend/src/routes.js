const express = require('express');
const UnformController = require('./controllers/UnformController');
const routes = express.Router();

routes.get('/', UnformController.index);

module.exports = routes;