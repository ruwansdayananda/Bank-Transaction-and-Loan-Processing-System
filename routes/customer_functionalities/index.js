// const express = require('express');
// const customer = require('../routes/customer');
// const employee = require('../routes/employee');
// const loan = require('../routes/loan');
// const savings_account = require('../routes/savings_account');

const online_loan = require('./online_loan');
const routes = require('express').Router();

routes.use('/loan', online_loan);


module.exports = routes;