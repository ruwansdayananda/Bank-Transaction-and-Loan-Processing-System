
const routes = require('express').Router();

routes.use('/customer', require('./customer'));
routes.use('/savings_account', require('./savings_account'));
routes.use('/fixed_deposit', require('./fixed_deposit'));
routes.use('/loan', require('./normal_loan'));
routes.use('/checking_account', require('./checking_account'));
routes.use('/login', require('./login'));

module.exports = routes;