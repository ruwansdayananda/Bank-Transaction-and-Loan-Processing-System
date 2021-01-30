const express = require('express');
const router = express.Router();
var path = require("path");
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');

const {
    createCorporateCustomer,
    createIndividualCustomer,
    findCustomerProfile
} = require('../../controllers/employee/customer');

// GET REQUESTS

// http://localhost:3000/employee/customer/individual
router.get('/individual', [isLoggedIn, isEmployee], (request, response) => {
    response.render('employee/individual');
});

// http://localhost:3000/employee/customer/corporate
router.get('/corporate', [isLoggedIn, isEmployee], (request, response) => {
    response.render('employee/corporate');

});

router.post('/individual', [isLoggedIn, isEmployee], createIndividualCustomer);

router.post('/corporate', [isLoggedIn, isEmployee], createCorporateCustomer);

router.post('/findCustomerProfile', [isLoggedIn, isEmployee], findCustomerProfile);

// http://localhost:3000/employee/customer/functions
router.get('/functions', [isLoggedIn, isEmployee], (request, response) => {
    response.render('employee/service_a_customer');
});


module.exports = router;