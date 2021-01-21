const routes = require('express').Router();

routes.use('/employee', require('./employee'));
routes.use('/login', require('./login'));

module.exports = routes;