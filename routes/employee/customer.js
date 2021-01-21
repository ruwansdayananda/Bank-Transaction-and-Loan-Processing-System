const express = require('express');
const router = express.Router();
var path = require("path");
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');

const { createCorporateCustomer, createIndividualCustomer } = require('../../controllers/employee/customer');

// GET REQUESTS
router.get('/individual', [isLoggedIn, isEmployee], (request, response) => {
    response.render('employee/individual');

});

router.get('/corporate', [isLoggedIn, isEmployee], (request, response) => {
    response.render('employee/corporate');

});

router.post('/individual', createIndividualCustomer);

router.post('/corporate',createCorporateCustomer);




module.exports = router;
