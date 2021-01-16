const express = require('express');
const router = express.Router();
const { createFixedDeposit } = require('../../controllers/employee_functionalities/fixed_deposit');
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');
/**
 * @todo : add html file
 */

// route to create new savings account
router.post('/create', createFixedDeposit);


module.exports = router;



