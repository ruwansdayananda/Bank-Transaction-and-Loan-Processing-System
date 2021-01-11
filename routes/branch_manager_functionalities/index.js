const employee = require('./employee');
const login = require('./login');
const routes = require('express').Router();

routes.use('/employee', employee);
routes.use('/login', login);

module.exports = routes;