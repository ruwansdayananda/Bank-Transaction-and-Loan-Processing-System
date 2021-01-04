const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');
const { request } = require('express');
var path = require("path");

router.post('/personal', (request, response) => {
    const { error } = validateCustomer(request.body);
    if (error) {
        return response.status(404).send(error.details[0].message);
    }
    return response.status(200).send("No worries");
});

router.post('/corporate', (request, response) => {
    const {
        error
    } = validateCorporate(request.body);
    if (error) {
        return response.status(404).send(error.details[0].message);
    }
    return response.status(200).send("No worries");
});

router.get('/personal', (request, response) => {
        response.sendFile(path.join(__dirname, '../views/customer.html'));
});

router.get('/corporate', (request, response) => {
    response.sendFile(path.join(__dirname, '../views/corporate.html'));
});

module.exports = router;
