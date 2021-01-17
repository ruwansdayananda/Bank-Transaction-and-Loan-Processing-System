const express = require('express');
const router = express.Router();
var path = require("path");
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');

const { createCorporateCustomer, createIndividualCustomer } = require('../../controllers/employee_functionalities/customer');

// GET REQUESTS
router.get('/individual', [isLoggedIn, isEmployee], (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/employee_functionalities/individual.html'));

});

router.get('/corporate', [isLoggedIn, isEmployee], (request, response) => {
    response.sendFile(path.join(__dirname, '../../views/employee_functionalities/corporate.html'));

});

router.post('/individual', createIndividualCustomer);

router.post('/corporate',createCorporateCustomer);




module.exports = router;
