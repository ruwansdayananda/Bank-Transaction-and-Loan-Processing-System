
const routes = require('express').Router();
const user = require('./user');
const home = require('./home');


// this is the path taken to register new users
routes.use('/user', user);

routes.use('/home', home);

routes.use('/employee_functionalities', require('./employee_functionalities'))
routes.use('/customer_functionalities', require('./customer_functionalities'))
routes.use('/branch_manager_functionalities', require('./branch_manager_functionalities'))

module.exports = routes;