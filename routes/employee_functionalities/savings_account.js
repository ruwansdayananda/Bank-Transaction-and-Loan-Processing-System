const express = require('express');
const router = express.Router();
const { createSavingsAccount } = require('../../controllers/employee_functionalities/savings_account');


// route to create new savings account
router.post('/create', createSavingsAccount);


module.exports = router;
