const express = require('express');
const router = express.Router();
const { createNormalLoan } = require('../../controllers/employee/normal_loan');
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');


router.get('/normal', [isLoggedIn, isEmployee], (request, response) => {
    response.render("employee/normal_loan");
});

router.post('/normal', [isLoggedIn, isEmployee], createNormalLoan);


module.exports = router;