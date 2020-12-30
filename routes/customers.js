const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');

router.post('/', (request, response) => {
    const { error } = validateCustomer(request.body);
    if (error) {
        return response.status(404).send(error.details[0].message);
    }
    return response.status(200).send("No worries");
});


module.exports = router;
