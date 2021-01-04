const express = require('express');
const router = express.Router();
const { Customer, validateCustomer,validateCorporate } = require('../models/customer');
const { request } = require('express');
var path = require("path");

router.post('/individual', (request, response) => {
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

router.get('/individual', (request, response) => {
        response.sendFile(path.join(__dirname, '../views/customer.html'));
})
module.exports = router;
