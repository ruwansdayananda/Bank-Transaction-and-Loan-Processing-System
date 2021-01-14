const routes = require('express').Router();

routes.use('/loan', require('./online_loan'));
routes.use('/login', require('./login'));


module.exports = routes;