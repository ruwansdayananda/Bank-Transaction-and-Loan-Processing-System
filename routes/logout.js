const routes = require('express').Router();
const { logout } = require('../controllers/logout');

routes.post('/', logout);


module.exports = routes;
