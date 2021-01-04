const express = require('express');
const customer = require('../routes/customer');
const savings_account = require('../routes/savings_account');

module.exports = function (app) {

    app.use(express.json());
    
    app.use(express.urlencoded({ extended: true }));

    //endpoints added
    app.use('/customer', customer);

    //savings_acc end point
    app.use('/savings_account',savings_account);

}
