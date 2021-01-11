const routes = require('express').Router();

routes.use('/loan', require('./online_loan'));
routes.use('/login/corporate', require('./corporate_login'));
routes.use('/login/individual', require('./individual_login'));


module.exports = routes;