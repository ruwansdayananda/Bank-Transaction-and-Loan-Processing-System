const express = require('express');
const router = express.Router();
const {
    employee,
    validateEmployee
} = require('../../models/employee');

var path = require("path");

// GET REQUESTS
router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/employee.html'));
});

// POST REQUESTS

router.post('/create', (request, response) => {
    const {
        error
    } = validateEmployee(request.body);
    if (error) {
        return response.status(404).send(error.details[0].message);
    }
    return response.status(200).send(request.body);
});

module.exports = router;
