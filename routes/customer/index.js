const routes = require('express').Router();

routes.use('/loan', require('./online_loan'));
routes.use('/login', require('./login'));
routes.use('/account', require('./account'));

routes.get('/', (request, response) => {
    return response.render('customer/home');
});

module.exports = routes;