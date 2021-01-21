const express = require('express');
const router = express.Router();
const { createSavingsAccount } = require('../../controllers/employee/savings_account');
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');
const path = require('path');
// URL: localhost:3000/employee/savings_account/create
// Method: GET
// route to create new savings account
router.get('/', [isLoggedIn, isEmployee], (req, res) => {
    response.sendFile(path.join(__dirname, '../../views/employee/savings_account.html'));
});


// URL: localhost:3000/employee/savings_account/create
// Method: POST
// route to create new savings account
router.post('/', [isLoggedIn, isEmployee], createSavingsAccount);


module.exports = router;
