// const express = require('express');
const customer = require('./customer');
const loan = require('./loan');
const savings_account = require('./savings_account');

const routes = require('express').Router();
routes.use('/customer', customer);
routes.use('/savings_account', savings_account);
routes.use('/loan', loan);


module.exports = routes;