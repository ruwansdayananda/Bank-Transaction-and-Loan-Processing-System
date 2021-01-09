// const express = require('express');
const customer = require('./customer');
const normal_loan = require('./normal_loan');
const savings_account = require('./savings_account');
const checking_account = require('./checking_account');

const routes = require('express').Router();
routes.use('/customer', customer);
routes.use('/savings_account', savings_account);
routes.use('/loan', normal_loan);
routes.use('/checking_account',checking_account);

module.exports = routes;