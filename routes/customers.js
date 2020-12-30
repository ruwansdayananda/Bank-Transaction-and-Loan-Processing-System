const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

router.get('/', (request, response) => {
    response.send("Hello World");
});

router.post('/', (request, response) => {
    response.send("Hello World");
});


module.exports = router;
