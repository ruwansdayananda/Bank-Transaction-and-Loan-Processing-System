const express = require('express');
const customers = require('../routes/customers');
const savings_account = require('../routes/savings_account');

module.exports = function (app) {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //endpoints added
    app.use('/customers', customers);
    // app.use('/employees', employees);

    //savings_acc end point
    app.use('/savings_account',savings_account);

}
