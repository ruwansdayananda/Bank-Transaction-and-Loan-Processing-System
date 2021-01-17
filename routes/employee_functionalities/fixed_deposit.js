const express = require('express');
const router = express.Router();
const { createFixedDeposit } = require('../../controllers/employee_functionalities/fixed_deposit');
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');
const path = require('path');

/**
 * @todo : add html file
 */

router.get('/', (req, res) => {
    return response.sendFile(path.join(__dirname, '../../views/employee_functionalities/fixed_deposit.html'));

});

// route to create new savings account
router.post('/',[isLoggedIn,isEmployee], createFixedDeposit);


module.exports = router;



