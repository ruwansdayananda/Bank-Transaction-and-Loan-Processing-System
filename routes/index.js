
const routes = require('express').Router();
const home = require('./home');
const login = require('./login');

// this is the path taken to register new users
routes.use('/home', home);
routes.use('/login', login);

routes.use('/employee', require('./employee_functionalities'))
routes.use('/customer', require('./customer_functionalities'))
routes.use('/branch_manager', require('./branch_manager_functionalities'))

module.exports = routes;