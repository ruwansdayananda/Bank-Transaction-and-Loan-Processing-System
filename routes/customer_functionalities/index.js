// const express = require('express');
// const customer = require('../routes/customer');
// const employee = require('../routes/employee');
// const loan = require('../routes/loan');
// const savings_account = require('../routes/savings_account');

const online_loan = require('./online_loan');
const corporate_login = require('./corporate_login');
const individual_login = require('./individual_login');
const routes = require('express').Router();

routes.use('/loan', online_loan);
routes.use('/login/corporate', corporate_login);
routes.use('/login/individual', individual_login);


module.exports = routes;