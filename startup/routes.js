const express = require('express');
const customers = require('../routes/customers');

module.exports = function (app) {

    app.use(express.json());

    //endpoints added
    app.use('/api/customers', customers);
}
