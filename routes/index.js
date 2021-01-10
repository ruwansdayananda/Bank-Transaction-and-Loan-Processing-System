// const express = require('express');
// const customer = require('../routes/customer');
// const employee = require('../routes/employee');
// const loan = require('../routes/loan');
// const savings_account = require('../routes/savings_account');

const routes = require('express').Router();
const user = require('./user');
const auth = require('./auth');
const employee_functionalities = require('./employee_functionalities');
const customer_functionalities = require('./customer_functionalities');
const branch_manager_functionalities = require('./branch_manager_functionalities');


// this is the path taken to register new users
routes.use('/user', user);

// this is the path taken to authenticate after logging in
routes.use('/auth', auth);

routes.use('/employee_functionalities', employee_functionalities)
routes.use('/customer_functionalities', customer_functionalities)
routes.use('/branch_manager_functionalities', branch_manager_functionalities)

module.exports = routes;