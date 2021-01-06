const employee = require('./employee');
const routes = require('express').Router();

routes.use('/employee', employee);

module.exports = routes;