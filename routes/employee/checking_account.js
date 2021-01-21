const express = require('express');
const router = express.Router();
const isLoggedIn = require('../../middleware/login');
const isEmployee = require('../../middleware/employee');
const path = require('path');
const {createCheckingAccount} = require('../../controllers/employee/checking_account')

router.get('/', [isLoggedIn, isEmployee], (request, response) => {
    response.render('employee/checking_account');
});

// route to create new checking account
// URL localhost:3000/employee/checking_account
router.post('/', [isLoggedIn, isEmployee], createCheckingAccount);

module.exports = router;
